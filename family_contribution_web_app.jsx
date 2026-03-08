import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Search, Users, Wallet, CalendarDays, CheckCircle2 } from "lucide-react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const initialMembers = [
  { id: 1, name: "Xuseen Muuse", payments: { Jan: 100, Feb: 100, Mar: 0, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 100, Sep: 100, Oct: 100, Nov: 100, Dec: 100 } },
  { id: 2, name: "Zuheyra Ahmed", payments: { Jan: 100, Feb: 100, Mar: 0, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 100, Sep: 100, Oct: 100, Nov: 100, Dec: 100 } },
  { id: 3, name: "C/man Xuseen", payments: { Jan: 100, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 100, Sep: 100, Oct: 100, Nov: 100, Dec: 100 } },
  { id: 4, name: "Maxamed Xuseen", payments: { Jan: 100, Feb: 100, Mar: 100, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 100, Sep: 100, Oct: 100, Nov: 100, Dec: 100 } },
  { id: 5, name: "Mussa Xuseen", payments: { Jan: 100, Feb: 100, Mar: 100, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 100, Sep: 100, Oct: 100, Nov: 100, Dec: 100 } },
  { id: 6, name: "Amina Xuseen", payments: { Jan: 100, Feb: 100, Mar: 100, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 100, Sep: 100, Oct: 100, Nov: 100, Dec: 100 } },
  { id: 7, name: "Samiira Xuseen", payments: { Jan: 100, Feb: 100, Mar: 0, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 100, Sep: 100, Oct: 100, Nov: 100, Dec: 100 } },
  { id: 8, name: "Saciido Xuseen", payments: { Jan: 100, Feb: 100, Mar: 0, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 100, Sep: 100, Oct: 100, Nov: 100, Dec: 100 } },
];

function sumMember(payments) {
  return months.reduce((acc, month) => acc + Number(payments[month] || 0), 0);
}

export default function FamilyContributionWebApp() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Jan");

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => m.name.toLowerCase().includes(q));
  }, [members, search]);

  const monthlyTotals = useMemo(() => {
    return months.map((month) => ({
      month,
      total: members.reduce((acc, member) => acc + Number(member.payments[month] || 0), 0),
    }));
  }, [members]);

  const totalCollected = useMemo(() => members.reduce((acc, m) => acc + sumMember(m.payments), 0), [members]);
  const activeMembers = members.length;
  const paidThisMonth = members.filter((m) => Number(m.payments[selectedMonth] || 0) > 0).length;
  const unpaidThisMonth = activeMembers - paidThisMonth;

  const updatePayment = (id, month, value) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? {
              ...member,
              payments: {
                ...member.payments,
                [month]: value === "" ? 0 : Number(value),
              },
            }
          : member
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Family Contribution Manager</h1>
            <p className="mt-1 text-sm text-slate-600">Track monthly tabarucaad, member payments, and yearly totals in one place.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button>Add Member</Button>
            <Button variant="outline">Export Report</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-600"><Wallet className="h-4 w-4" /> Total Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCollected}</div>
              <p className="text-xs text-slate-500">All member contributions combined</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-600"><Users className="h-4 w-4" /> Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeMembers}</div>
              <p className="text-xs text-slate-500">Registered family members</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-600"><CheckCircle2 className="h-4 w-4" /> Paid in {selectedMonth}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{paidThisMonth}</div>
              <p className="text-xs text-slate-500">Members who already paid</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-600"><CalendarDays className="h-4 w-4" /> Unpaid in {selectedMonth}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{unpaidThisMonth}</div>
              <p className="text-xs text-slate-500">Members still pending</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Monthly Contribution Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[360px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyTotals}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="total" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <CardTitle>Member Payment Tracker</CardTitle>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative min-w-[260px]">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search member" className="pl-9" />
                    </div>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-xl border bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Member</TableHead>
                        {months.map((month) => (
                          <TableHead key={month}>{month}</TableHead>
                        ))}
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map((member) => {
                        const total = sumMember(member.payments);
                        const paid = Number(member.payments[selectedMonth] || 0) > 0;
                        return (
                          <TableRow key={member.id}>
                            <TableCell>{member.id}</TableCell>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            {months.map((month) => (
                              <TableCell key={month}>
                                <Input
                                  type="number"
                                  value={member.payments[month] || ""}
                                  onChange={(e) => updatePayment(member.id, month, e.target.value)}
                                  className="h-9 min-w-[78px]"
                                />
                              </TableCell>
                            ))}
                            <TableCell className="font-semibold">{total}</TableCell>
                            <TableCell>
                              <Badge variant={paid ? "default" : "secondary"}>{paid ? "Paid" : "Pending"}</Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
