import Image from "next/image"

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Scottsdale Luxury Seller Blueprint"
        width={40}
        height={40}
        priority
      />
      <span className="font-semibold tracking-wide text-brand-navy">
        Scottsdale Luxury Seller Blueprint
      </span>
    </div>
  )
}
