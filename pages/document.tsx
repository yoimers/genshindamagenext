import Link from "next/link";
export default function Document() {
  return (
    <div>
      Document!
      <Link href="/">
        <a>Homeへ</a>
      </Link>
    </div>
  );
}
