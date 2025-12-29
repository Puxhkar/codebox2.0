"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { UserButton, useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import axios from "axios";
import { Course } from "../(routes)/courses/_components/CourseList";


function Header() {
  const { user } = useUser();
  const { exerciseSlug } = useParams();

  // ✅ FIX 1: Course[] (array)
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const res = await axios.get("/api/course");
      setCourses(res.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto flex justify-between items-center w-full">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h2 className="font-bold font-game text-3xl">StudentCodeBox</h2>
      </div>

      {/* Navbar */}
      {!exerciseSlug && courses.length > 0 && (
        <NavigationMenu>
          <NavigationMenuList className="gap-8">
            {/* Courses Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4">
                <ul className="grid grid-cols-2 gap-2 sm:w-[400px] md:w-[500px] lg:w-[600px]">
                  {courses.map((course) => (
                    <Link
                      key={course.id}
                      href={'/courses/'+course?.courseId}
                    >
                      <li className="p-2 hover:bg-accent rounded-xl cursor-pointer">
                        <h2 className="font-medium">{course.title}</h2>
                        <p className="text-xs text-gray-500">
                          {course.desc}
                        </p>
                      </li>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/Projects">Projects</Link>
                
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/pricing">Pricing</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/Contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      {/* Auth Section */}
      {!user ? (
        <Link href="/sign-in">
          <Button className="font-game text-2xl" variant="pixel">
            Signup
          </Button>
        </Link>
      ) : (
        <div className="flex gap-4 items-center">
          <Link href="/dashboard">
            <Button className="font-game text-2xl" variant="pixel">
              Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
      )}
    </div>
  );
}

export default Header;
