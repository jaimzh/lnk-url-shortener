 import { ExternalLink,
} from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/db";
import { Url } from "@/models/UrlSchema";
import { CopyCell } from "./copy-cell";

// Simple date formatter
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};



type Props = {
  searchParams?: Promise<{
    page?: string;
  }>;
  // Fallback if passed directly as prop
  page?: number;
};

export async function UrlList(props: Props) {
  await dbConnect();

  // Handle both searchParams (from Page) and direct prop usage
  const params = await props.searchParams;
  const currentPage = Number(params?.page || props.page || 1);
  const LIMIT = 6;
  const skip = (currentPage - 1) * LIMIT;

  const urls = await Url.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(LIMIT)
    .lean();

  const totalDocs = await Url.countDocuments();
  const totalPages = Math.ceil(totalDocs / LIMIT);

  // Type definition for the Mongoose result
  interface UrlDoc {
    _id: unknown;
    shortCode: string;
    originalUrl: string;
    clicks: number;
    createdAt: Date;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="w-[250px] text-muted-foreground">
                Short Link
              </TableHead>
              <TableHead className="text-muted-foreground">
                Original Link
              </TableHead>

              <TableHead className="text-center text-muted-foreground">
                  Clicks
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No links found. Create one to get started!
                </TableCell>
              </TableRow>
            ) : (
              urls.map((doc: any) => {
                // using any to bypass strict ID checks on lean objects, or cast
                const url = doc as UrlDoc;
                const fullShortUrl = `${process.env.BASE_URL || ""}/${url.shortCode}`;

                return (
                  <TableRow
                    key={String(url._id)}
                    className="border-b border-dashed border-border/50 hover:bg-accent/[0.05]"
                  >
                    <TableCell className="font-medium">
                      <CopyCell text={fullShortUrl} />
                    </TableCell>
                    <TableCell>
                        <a
                          href={url.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground text-xs truncate max-w-[200px] hover:text-accent transition-colors flex items-center gap-1"
                        >
                          {url.originalUrl}
                          <ExternalLink size={10} className="opacity-50" />
                        </a>

                    </TableCell>

                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center bg-accent/10 text-accent px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-accent/20 min-w-[3rem]">
                        {url.clicks.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground font-mono">
                      <div className="flex items-center justify-end gap-2">
                        {formatDate(url.createdAt)}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-card/30">
            <p className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs border-border bg-transparent hover:bg-accent/10 hover:text-accent text-muted-foreground disabled:opacity-50"
                asChild
                disabled={currentPage <= 1}
              >
                {currentPage > 1 ? (
                  <Link href={`?page=${currentPage - 1}`}>Previous</Link>
                ) : (
                  <span>Previous</span>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs border-border bg-transparent hover:bg-accent/10 hover:text-accent text-muted-foreground disabled:opacity-50"
                asChild
                disabled={currentPage >= totalPages}
              >
                {currentPage < totalPages ? (
                  <Link href={`?page=${currentPage + 1}`}>Next</Link>
                ) : (
                  <span>Next</span>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
