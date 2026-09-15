import Image from "next/image";
import styles from "./DeviceImage.module.css";

type DeviceImageProps = {
  src: string;
  alt: string;
  variant: "mobile" | "totem";
};

// Proportion is law: mobile screens keep their native ~393:852 ratio,
// totem screens keep 16:9 — never stretched, never wrapped in a device
// frame/chrome.
export function DeviceImage({ src, alt, variant }: DeviceImageProps) {
  const dimensions =
    variant === "mobile"
      ? { width: 393, height: 852 }
      : { width: 696, height: 392 };

  return (
    <div className={`${styles.wrap} ${styles[variant]}`}>
      <Image
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className={styles.image}
        sizes={variant === "mobile" ? "341px" : "100vw"}
      />
    </div>
  );
}
