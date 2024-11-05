import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="mt-auto border-t bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                title: "About",
                links: ["About Us", "Careers", "Press", "Blog"],
              },
              {
                title: "Legal",
                links: ["Terms", "Privacy", "Cookie Settings", "Guidelines"],
              },
              {
                title: "Social",
                links: ["Twitter", "Instagram", "Facebook", "YouTube"],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="mb-3 font-semibold">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
