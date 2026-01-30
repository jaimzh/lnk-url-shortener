import dbConnect from "@/lib/db";
import { Url, UrlDoc } from "@/models/UrlSchema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyCell } from "./copy-cell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { headers } from "next/headers";
import { QrCode } from "lucide-react";
import { QrCell } from "@/components/features/dashboard/qr-cell";

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

type DashboardTableProps = {
  searchParams?: Promise<{ page?: string }>;
  codePageNumber?: number;
};

export async function DashboardTable(props: DashboardTableProps) {
  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const baseUrl = `${protocol}://${host}`;

  await dbConnect();

  const params = await props.searchParams;
  const currentPage = Number(params?.page || props.codePageNumber || 1);

  const LIMIT = 6;
  const skip = (currentPage - 1) * LIMIT;

  const urls = await Url.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(LIMIT)
    .lean();

  const totalDocs = await Url.countDocuments();
  const totalPages = Math.ceil(totalDocs / LIMIT);

  return (
    <div className="w-full flex justify-center py-4">
      <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm">
        <Table className="w-auto  min-w-[600px]">
          <TableHeader>
            <TableRow className="hover:bg-accent/20 bg-accent/20 border-b">
              <TableHead className="px-10 text-center font-bold">
                Link
              </TableHead>
              <TableHead className="px-10 text-center font-bold">
                QR Code
              </TableHead>
              <TableHead className="px-10 text-center font-bold">
                Clicks
              </TableHead>
              <TableHead className="px-10 text-center font-bold">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-32 text-center text-muted-foreground"
                >
                  No links found.
                </TableCell>
              </TableRow>
            ) : (
              urls.map((url: any) => {
                const fullShortLink = `${baseUrl}/${url.shortCode}`;
                return (
                  <TableRow
                    key={String(url._id)}
                    className="hover:bg-accent/10"
                  >
                    <TableCell>
                      <div className="flex items-center justify-center w-full px-4">
                        <CopyCell text={fullShortLink} />
                      </div>
                    </TableCell>

                    <TableCell>
                      {/* I NEED TO MAKE SURE IT SHOWS THE url codde card */}
                      <div className="flex items-center justify-center w-full px-4">


                       <QrCell originalUrl={url.originalUrl} shortUrl={fullShortLink} />
                      </div>
                    </TableCell>

                    <TableCell className="text-center font-medium px-4">
                      {url.clicks.toLocaleString()}
                    </TableCell>

                    <TableCell className="text-center text-muted-foreground px-4">
                      {formatDate(url.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-card/30">
            <p className="text-xs text-text-muted">
              {currentPage}/{totalPages}
            </p>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-8 px-3 text-xs border-border bg-transparent hover:bg-accent/10 hover:text-text-base text-text-muted disabled:opacity-50"
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
                asChild
                className="h-8 px-3 text-xs border-border bg-transparent hover:bg-accent/10 hover:text-text-base text-text-muted disabled:opacity-50"
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
