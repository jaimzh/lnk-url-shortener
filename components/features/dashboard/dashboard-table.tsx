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
import { QrCode } from "lucide-react";
import { QrCell } from "@/components/features/dashboard/qr-cell";

import { getBaseUrl } from "@/lib/server-utils";

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
  const baseUrl = await getBaseUrl();

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
    <div id="dashboard-table" className="w-full flex justify-center py-6">
      <div className="w-full max-w-4xl rounded-xl border border-border/40 overflow-hidden bg-bg-base/40 backdrop-blur-md shadow-xl ring-1 ring-white/5">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-white/5">
              <TableHead className="py-4 px-4 text-center text-xs font-medium uppercase tracking-wider text-text-muted/60 w-[40%]">
                Link
              </TableHead>
              <TableHead className="py-4 px-4 text-center text-xs font-medium uppercase tracking-wider text-text-muted/60 w-[20%]">
                QR Code
              </TableHead>
              <TableHead className="py-4 px-4 text-center text-xs font-medium uppercase tracking-wider text-text-muted/60 w-[20%]">
                Clicks
              </TableHead>
              <TableHead className="py-4 px-4 text-center text-xs font-medium uppercase tracking-wider text-text-muted/60 w-[20%]">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-40 text-center text-text-muted/50 font-light"
                >
                  <div className="flex flex-col items-center gap-2">
                    <p>No links created yet</p>
                    <p className="text-xs opacity-50">
                      Your shortened URLs will appear here
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              urls.map((url: any) => {
                const fullShortLink = `${baseUrl}/${url.shortCode}`;
                return (
                  <TableRow
                    key={String(url._id)}
                    className="hover:bg-accent/5 transition-colors duration-300 border-b border-white/5 group"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center w-full px-4">
                        <CopyCell text={fullShortLink} />
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex items-center justify-center w-full px-4 text-text-muted group-hover:text-accent transition-colors duration-300">
                        <QrCell
                          originalUrl={url.originalUrl}
                          shortUrl={fullShortLink}
                        />
                      </div>
                    </TableCell>

                    <TableCell className="text-center font-light text-text-base/90 px-4 py-4 tabular-nums">
                      {url.clicks.toLocaleString()}
                    </TableCell>

                    <TableCell className="text-center text-text-muted/60 text-sm px-4 py-4 font-light">
                      {formatDate(url.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-accent/2">
            <p className="text-xs text-text-muted/40 font-mono">
              PAGE {currentPage} OF {totalPages}
            </p>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-8 px-4 text-xs font-medium text-text-muted hover:text-text-base hover:bg-accent/10 transition-all duration-300 disabled:opacity-30"
                disabled={currentPage <= 1}
              >
                {currentPage > 1 ? (
                  <Link href={`?page=${currentPage - 1}#dashboard-table`}>
                    Previous
                  </Link>
                ) : (
                  <span>Previous</span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-8 px-4 text-xs font-medium text-text-muted hover:text-text-base hover:bg-accent/10 transition-all duration-300 disabled:opacity-30"
                disabled={currentPage >= totalPages}
              >
                {currentPage < totalPages ? (
                  <Link href={`?page=${currentPage + 1}#dashboard-table`}>
                    Next
                  </Link>
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
