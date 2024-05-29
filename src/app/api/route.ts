import { type NextRequest } from "next/server";
import { JSDOM } from "jsdom";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dutchNoum = searchParams.get("noum");

  const res = await fetch(`https://www.welklidwoord.nl/${dutchNoum}`);
  const html = await res.text();

  const dom = new JSDOM(html);
  const pageDocument = dom.window.document;
  const querySelectorResult = pageDocument.querySelector("#content > h2");
  const article = querySelectorResult?.textContent;

  return Response.json({
    noum: article ?? "This seems to be an invalid dutch noum",
  });
}
