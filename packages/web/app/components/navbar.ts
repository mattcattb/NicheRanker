import React from "react";
import {Icon} from "@iconify/react";
import {useNavigate, useFetcher} from "react-router";
import {Button} from "@/components/ui/Button";
import Logo from "@/assets/newlogo.svg";
import Favicon from "@/assets/favicon.svg";
import DepositAddress from "@/components/layout/DepositAddress";
import BalanceDisplay from "@/components/features/betting/BalanceDisplay";
import {useBalance} from "@/context/useBalance";
import UserDropdown from "@/components/layout/UserDropdown";
import {cn} from "@/lib/utils/styling";
import type {Address} from "@api/features/crypto/crypto.schemas";
import {CircleHelp, MessageCircleQuestionIcon} from "lucide-react";

type NavbarProps = {
  addresses?: Address[] | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  username?: string;
};

const NavbarComponent = React.memo(function NavbarComponent({
  addresses,
  isAuthenticated,
  isAdmin,
  username,
}: NavbarProps) {
  // ! use betting is a hook, so this doenst actually use that state!
  const {balance} = useBalance();

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
          {/* Left section - Logo */}
          <div className="flex justify-start w-fit">
            <img src={Logo} alt="Reroll Logo" className="h-8 max-sm:hidden" />
            <img src={Favicon} alt="Reroll Logo" className="h-8 sm:hidden" />
          </div>

          {/* Center section - Bitcoin address (only shown when authenticated) */}
          {isAuthenticated && (
            <div className="min-w-fit flex justify-center items-center">
              <BalanceDisplay
                isAuthenticated={isAuthenticated}
                balance={balance}
              />
            </div>
          )}

          {/* Right section - modal icon */}
          <div className="flex-shrink-0 w-full">
            <div className="flex items-center justify-end space-x-3">
              <Button
                onPress={() => navigate("/leaderboard")}
                size="icon"
                className="flex items-center gap-2 font-semibold"
                variant="ghost">
                <Icon icon={`ri:trophy-line`} className="h-5 w-5" />
                <span className="sr-only">Leaderboard</span>
              </Button>

              {!isAuthenticated && (
                <Button
                  onPress={() => navigate("/info")}
                  size="icon"
                  variant="ghost"
                  className="flex items-center gap-2 font-semibold">
                  <CircleHelp className="h-5 w-5" />
                  <span className="sr-only">Info</span>
                </Button>
              )}

              {/* Auth button */}
              {isAuthenticated ? (
                <UserDropdown isAdmin={isAdmin} username={username} />
              ) : (
                <Button
                  variant={"primary"}
                  onPress={handleAuthClick}
                  size={"default"}
                  className="flex items-center gap-2 font-semibold">
                  <Icon icon={`ri:login-box-line`} className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});

export const Navbar = NavbarComponent;
