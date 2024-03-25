import { useRouter } from 'next/router';


const ButtonLead= () => {
  const router = useRouter();

  const redirectToExistingPage = () => {
    // Redirect to the existing page
    router.push('/https://www.tattooswithai.com/dashboard');
  };

  return (
    <ButtonLead>onClick={redirectToExistingPage} 
      Join Waitlist
      </ButtonLead>
  );
};

export default ButtonLead;
