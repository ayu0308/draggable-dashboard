import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

const formBuilders = [
  {
    name: "Simple Contact Form",
    description: "A basic contact form with name, email, and message fields.",
    link: "/forms/form-builder", // Replace with actual route or component in the future
    createdDate: "2024-06-01",
  },
  {
    name: "Survey Form",
    description: "A customizable survey form builder.",
    link: "#",
    createdDate: "2024-05-20",
  },
  {
    name: "Registration Form",
    description: "A user registration form with validation.",
    link: "#",
    createdDate: "2024-06-10",
  },
  // Add more as you build them!
];

const Forms = () => {
  const [sortBy, setSortBy] = useState<"name" | "createdDate">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sorting logic
  const sortedFormBuilders = [...formBuilders].sort((a, b) => {
    let compare = 0;
    if (sortBy === "name") {
      compare = a.name.localeCompare(b.name);
    } else if (sortBy === "createdDate") {
      compare = a.createdDate.localeCompare(b.createdDate);
    }
    return sortOrder === "asc" ? compare : -compare;
  });

  // Toggle sort
  const handleSort = (column: "name" | "createdDate") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Forms</h1>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p>Welcome to the forms page! Below are some form builders you can use:</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                Name {sortBy === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("createdDate")}
              >
                Created Date {sortBy === "createdDate" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFormBuilders.map((form, idx) => (
              <TableRow key={idx}>
                <TableCell>{form.name}</TableCell>
                <TableCell>{form.description}</TableCell>
                <TableCell>{form.createdDate}</TableCell>
                <TableCell>
                  <a
                    href={form.link}
                    className="text-blue-500 hover:underline flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Forms; 