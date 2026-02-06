"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Welcome to the elite!");
      setEmail("");
    } catch {
      toast.error("Failed to subscribe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-black border-t border-gray-800">
      <div className="mx-auto w-[94%] md:w-[90%] lg:w-[80%]">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
          JOIN THE ELITE
        </h2>
        <p className="text-gray-400 mb-8 text-sm md:text-base">
          Get early access to drops and exclusive styling tips
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 max-w-md"
        >
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-gray-900 border-gray-700 text-white placeholder-gray-500"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-white text-black hover:bg-gray-200 px-6"
          >
            {isLoading ? "..." : "JOIN"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
