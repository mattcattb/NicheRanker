import {useNavigate, useFetcher} from "react-router";
import {cn} from "@/lib/utils/styling";
import {TbHexagonLetterMFilled} from "react-icons/tb";
import {Button} from "@/components/ui/Button";
import {Text} from "react-aria-components";

type NavbarProps = {
  isAuthenticated: boolean;
  username?: string;
};

const NavbarComponent = ({isAuthenticated, username}: NavbarProps) => {
  // ! use betting is a hook, so this doenst actually use that state!

  const navigate = useNavigate();
  let fetcher = useFetcher();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      fetcher.submit(null, {method: "post", action: "/api/auth/sign-out"});
    } else {
      navigate("/signup", {viewTransition: true});
    }
  };

  return (
    <nav className="w-full border-b border-border/50 shrink-0 h-fit sticky top-0 z-50 bg-background">
      <div className="flex-col flex w-full h-full">
        <div
          className={cn("grid justify-between items-center gap-3 h-full p-3", {
            "grid-cols-[1fr_1fr]": !isAuthenticated,
            "grid-cols-[1fr_1fr_1fr]": isAuthenticated,
          })}>
          <div className="flex justify-start w-fit">
            <TbHexagonLetterMFilled className="h-8 max-sm:hidden" />
          </div>
          <Button onClick={handleAuthClick}>
            {isAuthenticated ? "Signout" : "Login"}
          </Button>
          {username && <Text>Welcome {username}</Text>}
        </div>
      </div>
    </nav>
  );
};

export const Navbar = NavbarComponent;
