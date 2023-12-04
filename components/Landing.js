import { useRouter } from 'next/router';
import ButtonLead from "./ButtonLead";

const ButtonLead = () => {
  const router = useRouter();

  const redirectToExistingPage = () => {
    // Redirect to the existing page
    router.push('/https://www.findrr.ca/dashboard');
  };

  return (
    <ButtonLead>onClick={redirectToExistingPage} 
      Join Waitlist
      </ButtonLead>
  );
};

export default ButtonLead;
