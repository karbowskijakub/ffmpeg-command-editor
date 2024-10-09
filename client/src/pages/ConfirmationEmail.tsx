import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";


const ConfirmationEmail = () => {
  const handleLoginClick = () => {
    navigate("/login");
  };
  const navigate = useNavigate();
  return (
    <Button  onClick={handleLoginClick}>Go to login</Button>
  )
}

export default ConfirmationEmail