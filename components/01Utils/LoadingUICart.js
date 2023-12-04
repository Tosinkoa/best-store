import Image from "next/legacy/image";

const LoadingUICart = () => {
  return (
    <div className="flex min-h-[calc(100vh_-_55px)] w-full">
      <div className="relative inset-0 m-auto h-28 w-28">
        <Image
          src="/assets/gif/cart-animation.gif"
          alt="cart-animation"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default LoadingUICart;
