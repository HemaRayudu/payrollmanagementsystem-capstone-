import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  DollarSign, 
  Play, 
  Lock, 
  Unlock, 
  Calendar, 
  Users, 
  Calculator,
  Download,
  Eye,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface PayrollRun {
  id: number;
  month: string;
  year: number;
  status: 'draft' | 'processing' | 'completed' | 'locked';
  totalEmployees: number;
  totalAmount: number;
  processedDate?: string;
  lockedDate?: string;
}

interface PayrollItem {
  employeeId: number;
  employeeName: string;
  department: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  overtime: number;
  bonus: number;
  netSalary: number;
}

const PayrollManagement: React.FC = () => {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('03');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);
  const [selectedRun, setSelectedRun] = useState<PayrollRun | null>(null);

  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([
    {
      id: 1,
      month: 'March',
      year: 2024,
      status: 'completed',
      totalEmployees: 247,
      totalAmount: 485230,
      processedDate: '2024-03-31',
      lockedDate: '2024-04-05'
    },
    {
      id: 2,
      month: 'February',
      year: 2024,
      status: 'locked',
      totalEmployees: 242,
      totalAmount: 472100,
      processedDate: '2024-02-29',
      lockedDate: '2024-03-05'
    },
    {
      id: 3,
      month: 'January',
      year: 2024,
      status: 'locked',
      totalEmployees: 238,
      totalAmount: 465800,
      processedDate: '2024-01-31',
      lockedDate: '2024-02-05'
    },
    {
      id: 4,
      month: 'April',
      year: 2024,
      status: 'draft',
      totalEmployees: 250,
      totalAmount: 0
    }
  ]);

  const mockPayrollItems: PayrollItem[] = [
    {
      employeeId: 1,
      employeeName: 'John Doe',
      department: 'IT',
      basicSalary: 5000,
      allowances: 1200,
      deductions: 850,
      overtime: 500,
      bonus: 1000,
      netSalary: 6850
    },
    {
      employeeId: 2,
      employeeName: 'Jane Smith',
      department: 'Marketing',
      basicSalary: 4500,
      allowances: 900,
      deductions: 675,
      overtime: 200,
      bonus: 500,
      netSalary: 5425
    },
    {
      employeeId: 3,
      employeeName: 'Mike Johnson',
      department: 'HR',
      basicSalary: 4000,
      allowances: 800,
      deductions: 600,
      overtime: 0,
      bonus: 300,
      netSalary: 4500
    },
    {
      employeeId: 4,
      employeeName: 'Sarah Wilson',
      department: 'Finance',
      basicSalary: 4800,
      allowances: 1000,
      deductions: 720,
      overtime: 300,
      bonus: 700,
      netSalary: 6080
    }
  ];

  const handleCreatePayrollRun = () => {
    const newRun: PayrollRun = {
      id: Math.max(...payrollRuns.map(r => r.id)) + 1,
      month: getMonthName(parseInt(selectedMonth)),
      year: parseInt(selectedYear),
      status: 'draft',
      totalEmployees: 250, // Mock employee count
      totalAmount: 0
    };

    setPayrollRuns([newRun, ...payrollRuns]);
    setIsCreateDialogOpen(false);

    toast({
      title: "Payroll Run Created",
      description: `${newRun.month} ${newRun.year} payroll run has been created.`
    });
  };

  const handleProcessPayroll = (runId: number) => {
    setPayrollRuns(payrollRuns.map(run => {
      if (run.id === runId) {
        return {
          ...run,
          status: 'completed' as const,
          totalAmount: 492500, // Mock calculated amount
          processedDate: new Date().toISOString().split('T')[0]
        };
      }
      return run;
    }));

    toast({
      title: "Payroll Processed",
      description: "Payroll has been successfully processed for all employees."
    });
  };

  const handleLockPayroll = (runId: number) => {
    setPayrollRuns(payrollRuns.map(run => {
      if (run.id === runId) {
        return {
          ...run,
          status: 'locked' as const,
          lockedDate: new Date().toISOString().split('T')[0]
        };
      }
      return run;
    }));

    toast({
      title: "Payroll Locked",
      description: "Payroll has been locked and cannot be modified."
    });
  };

  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-muted text-muted-foreground';
      case 'processing':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'locked':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return AlertCircle;
      case 'processing':
        return Calculator;
      case 'completed':
        return CheckCircle;
      case 'locked':
        return Lock;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage monthly payroll processing and salary calculations
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Create Payroll Run
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Payroll Run</DialogTitle>
              <DialogDescription>
                Create a new payroll run for a specific month and year.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {getMonthName(i + 1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePayrollRun}>
                Create Payroll Run
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month's Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$492,500</div>
            <p className="text-xs text-muted-foreground">+1.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees Processed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250</div>
            <p className="text-xs text-muted-foreground">All active employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,970</div>
            <p className="text-xs text-muted-foreground">Per employee</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$49,250</div>
            <p className="text-xs text-muted-foreground">10% of gross payroll</p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Runs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Payroll Runs
          </CardTitle>
          <CardDescription>
            View and manage all payroll runs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-table-header">
                  <TableHead>Period</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Processed Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollRuns.map((run) => {
                  const StatusIcon = getStatusIcon(run.status);
                  return (
                    <TableRow key={run.id} className="hover:bg-table-row-hover">
                      <TableCell className="font-medium">
                        {run.month} {run.year}
                      </TableCell>
                      <TableCell>{run.totalEmployees}</TableCell>
                      <TableCell>
                        {run.totalAmount > 0 ? `$${run.totalAmount.toLocaleString()}` : 'Not processed'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(run.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {run.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {run.processedDate ? new Date(run.processedDate).toLocaleDateString() : 'Not processed'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {run.status === 'draft' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleProcessPayroll(run.id)}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          {run.status === 'completed' && !run.lockedDate && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLockPayroll(run.id)}
                            >
                              <Lock className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRun(run)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Details Modal */}
      <Dialog open={!!selectedRun} onOpenChange={() => setSelectedRun(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Payroll Details - {selectedRun?.month} {selectedRun?.year}
            </DialogTitle>
            <DialogDescription>
              Detailed breakdown of payroll items for this period
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Basic Salary</TableHead>
                  <TableHead>Allowances</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Overtime</TableHead>
                  <TableHead>Bonus</TableHead>
                  <TableHead>Net Salary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayrollItems.map((item) => (
                  <TableRow key={item.employeeId}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.employeeName}</div>
                        <div className="text-sm text-muted-foreground">{item.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>${item.basicSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-success">+${item.allowances.toLocaleString()}</TableCell>
                    <TableCell className="text-destructive">-${item.deductions.toLocaleString()}</TableCell>
                    <TableCell className="text-success">+${item.overtime.toLocaleString()}</TableCell>
                    <TableCell className="text-success">+${item.bonus.toLocaleString()}</TableCell>
                    <TableCell className="font-bold">${item.netSalary.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setSelectedRun(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PayrollManagement;