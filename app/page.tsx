import Main from "@/components/Main";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Edit, Download, Star } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Main>
        <header className="px-4 lg:px-6 h-14 flex items-center bg-white/80 backdrop-blur-md dark:bg-gray-800/80 sticky top-0 z-50">
          <Link className="flex items-center justify-center" href="#">
            <Edit className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold text-primary">ArticleWriter</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Blog
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    Write Articles with Ease, Download as PDF
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
                    Create beautiful articles using Markdown and export them as
                    professional PDFs in seconds.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Link href="/sign-in"> Get Started</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                Key Features
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-white/50 backdrop-blur-lg dark:bg-gray-800/50 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-purple-600 dark:text-purple-400">
                      Markdown Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Write your articles using simple and intuitive Markdown
                    syntax.
                  </CardContent>
                </Card>
                <Card className="bg-white/50 backdrop-blur-lg dark:bg-gray-800/50 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-pink-600 dark:text-pink-400">
                      PDF Export
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Download your articles as beautifully formatted PDF
                    documents with a single click.
                  </CardContent>
                </Card>
                <Card className="bg-white/50 backdrop-blur-lg dark:bg-gray-800/50 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-blue-600 dark:text-blue-400">
                      Real-time Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    See how your article will look as you write with our live
                    preview feature.
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                How It Works
              </h2>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="flex flex-col items-center text-center bg-white/50 backdrop-blur-lg dark:bg-gray-800/50 p-6 rounded-lg shadow-lg">
                  <Edit className="h-12 w-12 mb-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                    1. Write
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Compose your article using Markdown in our user-friendly
                    editor.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center bg-white/50 backdrop-blur-lg dark:bg-gray-800/50 p-6 rounded-lg shadow-lg">
                  <ArrowRight className="h-12 w-12 mb-4 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">
                    2. Preview
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    See your formatted article in real-time as you write.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center bg-white/50 backdrop-blur-lg dark:bg-gray-800/50 p-6 rounded-lg shadow-lg">
                  <Download className="h-12 w-12 mb-4 text-pink-600 dark:text-pink-400" />
                  <h3 className="text-xl font-bold mb-2 text-pink-600 dark:text-pink-400">
                    3. Download
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Export your finished article as a professionally styled PDF.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                What Our Users Say
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    className="bg-white/50 backdrop-blur-lg dark:bg-gray-800/50 border-0 shadow-lg"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 mr-2" />
                        <Star className="h-5 w-5 text-yellow-400 mr-2" />
                        <Star className="h-5 w-5 text-yellow-400 mr-2" />
                        <Star className="h-5 w-5 text-yellow-400 mr-2" />
                        <Star className="h-5 w-5 text-yellow-400" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      &ldquo;ArticleWriter has revolutionized my writing process. It&apos;s
                      so easy to use and the PDF export feature is a
                      game-changer!&rdquo;
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    Ready to Start Writing?
                  </h2>
                  <p className="mx-auto max-w-[600px] text-gray-700 md:text-xl dark:text-gray-300">
                    Join thousands of writers who trust ArticleWriter for their
                    content creation needs.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Link href="/sign-in">Get Started for Free</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900"
                  >
                    View Pricing
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white/80 backdrop-blur-md dark:bg-gray-800/80">
          <p className="text-xs text-gray-700 dark:text-gray-300">
            © 2024 ArticleWriter. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:text-primary transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:text-primary transition-colors"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </Main>
    </div>
  );
}
