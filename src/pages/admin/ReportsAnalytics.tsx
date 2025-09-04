import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  PieChart,
  FileText,
  Filter
} from 'lucide-react';

const ReportsAnalytics: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [reportType, setReportType] = useState('payroll');

  // Mock data for reports
  const payrollSummary = {
    totalPayroll: 485230,
    totalEmployees: 247,
    averageSalary: 1964,
    totalDeductions: 48523,
    totalBonuses: 25000,
    departmentBreakdown: [
      { department: 'IT', employees: 25, totalSalary: 125000, avgSalary: 5000 },
      { department: 'Marketing', employees: 15, totalSalary: 75000, avgSalary: 5000 },
      { department: 'HR', employees: 8, totalSalary: 32000, avgSalary: 4000 },
      { department: 'Finance', employees: 12, totalSalary: 60000, avgSalary: 5000 },
      { department: 'Sales', employees: 20, totalSalary: 100000, avgSalary: 5000 }
    ]
  };

  const leaveAnalytics = {
    totalLeaveDays: 156,
    pendingRequests: 8,
    approvedRequests: 45,
    rejectedRequests: 3,
    departmentLeave: [
      { department: 'IT', totalDays: 45, avgPerEmployee: 1.8 },
      { department: 'Marketing', totalDays: 32, avgPerEmployee: 2.1 },
      { department: 'HR', totalDays: 18, avgPerEmployee: 2.3 },
      { department: 'Finance', totalDays: 28, avgPerEmployee: 2.3 },
      { department: 'Sales', totalDays: 33, avgPerEmployee: 1.7 }
    ]
  };

  const employeeMetrics = [
    { metric: 'Total Active Employees', value: 247, change: '+5', trend: 'up' },
    { metric: 'New Hires This Month', value: 8, change: '+3', trend: 'up' },
    { metric: 'Resignations', value: 3, change: '-2', trend: 'down' },
    { metric: 'Average Tenure (Years)', value: 3.2, change: '+0.1', trend: 'up' }
  ];

  const topEarners = [
    { name: 'Sarah Johnson', department: 'IT', salary: 95000, position: 'Senior Manager' },
    { name: 'Mike Davis', department: 'Marketing', salary: 88000, position: 'Director' },
    { name: 'Lisa Wilson', department: 'Finance', salary: 82000, position: 'Senior Analyst' },
    { name: 'Robert Brown', department: 'Sales', salary: 78000, position: 'Sales Manager' },
    { name: 'John Smith', department: 'IT', salary: 75000, position: 'Team Lead' }
  ];

  const handleExportReport = () => {
    // Mock export functionality
    const reportData = {
      type: reportType,
      month: selectedMonth,
      department: selectedDepartment,
      generatedAt: new Date().toISOString(),
      data: reportType === 'payroll' ? payrollSummary : leaveAnalytics
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportType}-report-${selectedMonth}.json`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive payroll and HR analytics dashboard
          </p>
        </div>
        <Button onClick={handleExportReport} className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payroll">Payroll Summary</SelectItem>
                  <SelectItem value="leave">Leave Analytics</SelectItem>
                  <SelectItem value="employee">Employee Metrics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Input
                id="month"
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${payrollSummary.totalPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollSummary.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">+5 new hires this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${payrollSummary.averageSalary.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+3% increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Days Used</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveAnalytics.totalLeaveDays}</div>
            <p className="text-xs text-muted-foreground">2.1 days per employee</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Department Payroll Breakdown
            </CardTitle>
            <CardDescription>
              Salary distribution across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payrollSummary.departmentBreakdown.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">{dept.department}</div>
                    <div className="text-sm text-muted-foreground">
                      {dept.employees} employees
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${dept.totalSalary.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      Avg: ${dept.avgSalary.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Earners */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Top Earners
            </CardTitle>
            <CardDescription>
              Highest paid employees by salary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topEarners.map((employee, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {employee.position} - {employee.department}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">${employee.salary.toLocaleString()}</div>
                    <Badge variant="outline">#{index + 1}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Employee Metrics Summary
          </CardTitle>
          <CardDescription>
            Key HR metrics and trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-table-header">
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeMetrics.map((metric, index) => (
                  <TableRow key={index} className="hover:bg-table-row-hover">
                    <TableCell className="font-medium">{metric.metric}</TableCell>
                    <TableCell className="text-lg font-bold">{metric.value}</TableCell>
                    <TableCell>
                      <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'}>
                        {metric.change}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <TrendingUp 
                        className={`h-4 w-4 ${
                          metric.trend === 'up' ? 'text-success' : 'text-muted-foreground'
                        }`} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Leave Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Leave Analytics by Department
          </CardTitle>
          <CardDescription>
            Department-wise leave utilization analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-table-header">
                  <TableHead>Department</TableHead>
                  <TableHead>Total Leave Days</TableHead>
                  <TableHead>Avg per Employee</TableHead>
                  <TableHead>Utilization Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveAnalytics.departmentLeave.map((dept, index) => (
                  <TableRow key={index} className="hover:bg-table-row-hover">
                    <TableCell className="font-medium">{dept.department}</TableCell>
                    <TableCell>{dept.totalDays} days</TableCell>
                    <TableCell>{dept.avgPerEmployee} days</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${(dept.avgPerEmployee / 3) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {Math.round((dept.avgPerEmployee / 3) * 100)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAnalytics;