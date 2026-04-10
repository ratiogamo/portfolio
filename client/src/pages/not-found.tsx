import { Link } from "wouter";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center py-16">
      <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-lg mx-4 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-exclamation-triangle text-3xl text-red-400"></i>
        </div>
        <h1 className="text-4xl font-bold font-inter mb-4 text-white">404</h1>
        <p className="text-xl text-gray-300 mb-2">Page Not Found</p>
        <p className="text-gray-400 mb-8">
          This page doesn't exist. Let me help you find what you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <i className="fas fa-home mr-2"></i>Back to Home
            </Button>
          </Link>
          <a href="tel:+19545944040">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-red-300 border-red-500/50 hover:bg-red-500/10">
              <i className="fas fa-phone mr-2"></i>Emergency: 954-594-4040
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
