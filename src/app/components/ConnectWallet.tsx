import { Icons } from "@/app/lib/ui/components";
import { ComethWallet } from "@cometh/connect-sdk";
import { CheckIcon } from "@radix-ui/react-icons";

interface ConnectWalletProps {
  connectionError: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  isNfcConnecting: boolean;
  connect: () => Promise<void>;
  handleNfcReading: () => Promise<void>;
  wallet: ComethWallet;
}

function ConnectWallet({
  connectionError,
  isConnecting,
  isConnected,
  isNfcConnecting,
  connect,
  handleNfcReading,
  wallet,
}: ConnectWalletProps): JSX.Element {
  const getTextButton = () => {
    if (isConnected) {
      return (
        <>
          <CheckIcon width={20} height={20} />
          <a
            href={`https://mumbai.polygonscan.com/address/${wallet.getAddress()}`}
            target="_blank"
          >
            {"Wallet connected"}
          </a>
        </>
      );
    } else if (isConnecting) {
      return (
        <>
          <Icons.spinner className="w-6 h-6 animate-spin" />
          {"Getting wallet..."}
        </>
      );
    } else if (isNfcConnecting) {
      return (
        <>
          <Icons.spinner className="w-6 h-6 animate-spin" />
          {"Tap your card..."}
        </>
      );
    } else {
      return "Get your Wallet";
    }
  };

  return (
    <>
      {!connectionError ? (
        <button
          disabled={isConnecting || isConnected || !!connectionError}
          className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100 disabled:bg-white"
          onClick={handleNfcReading}
        >
          {getTextButton()}
        </button>
      ) : (
        <p className="flex items-center justify-center text-gray-900 bg-red-50">
          Connection denied
        </p>
      )}
    </>
  );
}

export default ConnectWallet;
