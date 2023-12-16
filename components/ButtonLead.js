"use client";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import apiClient from "@/libs/api";
import ButtonGradient from "@/components/ButtonGradient";

// This component is used to collect the emails from the landing page
// You'd use this if your product isn't ready yet or you want to collect leads
// For instance: A popup to send a freebie, joining a waitlist, etc.
// It calls the /api/lead/route.js route and store a Lead document in the database
const ButtonLead = ({ extraStyle }) => {
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    setIsLoading(true);
    try {
      await apiClient.post("/lead", { email });

      toast.success("Thanks for joining the waitlist!");

      // just remove the focus on the input
      inputRef.current.blur();
      setEmail("");
      setIsDisabled(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className={`w-full max-w-xs space-y-3 ${extraStyle ? extraStyle : ""}`}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="email"
        value={email}
        ref={inputRef}
        autoComplete="email"
        placeholder="Type your email..."
        className="input input-bordered w-full placeholder:opacity-60 bg-white"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3">
        Start using Findrr now type="submit"
      </button>
    </form>
  );
};

export default ButtonLead;
