import { type NextRequest } from "next/server";
import { JSDOM } from "jsdom";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dutchNoun = searchParams.get("noun");

  const res = await fetch(`https://www.welklidwoord.nl/${dutchNoun}`);
  const html = await res.text();

  const dom = new JSDOM(html);
  const pageDocument = dom.window.document;
  const querySelectorResult = pageDocument.querySelector("#content > h2");
  const article = querySelectorResult?.textContent?.trim();

  return Response.json({
    noun: article ?? "This seems to be an invalid dutch noun",
  });
}
