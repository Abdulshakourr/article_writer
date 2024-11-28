// app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <nav className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">MarkFlow</div>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Button asChild className="hidden md:block" variant="secondary">
              <Link href="/sign-in">sign in</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/sign-up">Try Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 max-w-6xl">
        <div className="py-12 sm:py-24 text-center">
          <h1 className="mb-4 sm:mb-6 text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            Transform Your Writing Workflow
          </h1>
          <p className="mx-auto mb-8 sm:mb-10 max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Write, preview, and export beautiful documents in seconds. The most intuitive Markdown editor
            for modern content creators.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/sign-up">Start Writing For Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">View Demo</Button>
          </div>
        </div>

        <div className="grid gap-8 sm:gap-12 py-12 sm:py-20 grid-cols-1 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 text-2xl">✍️</div>
            <h3 className="mb-2 text-lg sm:text-xl font-semibold dark:text-white">Real-time Preview</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              See your formatted content instantly as you type with our side-by-side preview.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 text-2xl">📑</div>
            <h3 className="mb-2 text-lg sm:text-xl font-semibold dark:text-white">PDF Export</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Export your documents to professional-looking PDFs with one click.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 text-2xl">🚀</div>
            <h3 className="mb-2 text-lg sm:text-xl font-semibold dark:text-white">Lightning Fast</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Built for speed and efficiency, no more waiting for previews to load.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-900 p-6 sm:p-12 text-center text-white dark:bg-gray-800">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold">Ready to elevate your writing?</h2>
          <p className="mx-auto mb-6 sm:mb-8 max-w-2xl text-base sm:text-lg text-gray-300">
            Join thousands of writers, developers, and content creators who have already
            transformed their workflow with MarkFlow.
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/sign-up"> Get Started Now</Link>
          </Button>
        </div>

        <div className="py-12 sm:py-20">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold dark:text-white">Why Choose MarkFlow?</h2>
              <ul className="space-y-3 text-sm sm:text-base dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Distraction-free writing environment</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Real-time collaboration features</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Advanced formatting options</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Free to use, no credit card required</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-gray-100 p-6 sm:p-8 dark:bg-gray-800">
              <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold dark:text-white">What users say</h3>
              <blockquote className="mb-4 sm:mb-6">
                <p className="mb-2 text-sm sm:text-base italic text-gray-700 dark:text-gray-300">
                  &quot;MarkFlow has completely transformed how I write documentation.
                  The real-time preview and PDF export are game-changers!&quot;
                </p>
                <footer className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  - Sarah Chen, Technical Writer
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              &copy; 2024 MarkFlow. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
              <Link href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}