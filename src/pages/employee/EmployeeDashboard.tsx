import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Calendar, 
  FileText, 
  DollarSign, 
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();

  const leaveBalance = {
    annual: { total: 21, used: 8, remaining: 13 },
    sick: { total: 10, used: 3, remaining: 7 },
    personal: { total: 5, used: 1, remaining: 4 }
  };

  const recentLeaveRequests = [
    {
      id: 1,
      type: 'Annual Leave',
      startDate: '2024-04-15',
      endDate: '2024-04-19',
      days: 5,
      status: 'approved',
      appliedDate: '2024-03-20'
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2024-03-10',
      endDate: '2024-03-11',
      days: 2,
      status: 'approved',
      appliedDate: '2024-03-09'
    },
    {
      id: 3,
      type: 'Personal Leave',
      startDate: '2024-04-25',
      endDate: '2024-04-25',
      days: 1,
      status: 'pending',
      appliedDate: '2024-03-22'
    }
  ];

  const salaryInfo = {
    currentMonth: {
      basicSalary: 5000,
      allowances: 1200,
      deductions: 850,
      netSalary: 5350
    },
    lastMonth: {
      netSalary: 5350
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return AlertTriangle;
      case 'pending':
        return Clock;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-6 text-primary-foreground">
        <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
        <p className="mt-2 opacity-90">
          Here's your personal dashboard with all your employment details.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salaryInfo.currentMonth.netSalary.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Net pay this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveBalance.annual.remaining}</div>
            <p className="text-xs text-muted-foreground">
              Annual leave days remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentLeaveRequests.filter(req => req.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employee ID</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">EMP{user?.id?.toString().padStart(3, '0')}</div>
            <p className="text-xs text-muted-foreground">
              Your employee identifier
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Balance Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Leave Balance Summary
            </CardTitle>
            <CardDescription>
              Your current leave entitlements and usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(leaveBalance).map(([type, balance]) => (
              <div key={type} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{type} Leave</span>
                  <span className="text-sm text-muted-foreground">
                    {balance.remaining}/{balance.total} days
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{
                      width: `${(balance.remaining / balance.total) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recent Leave Requests
            </CardTitle>
            <CardDescription>
              Your latest leave applications and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeaveRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status);
                return (
                  <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{request.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.startDate} - {request.endDate} ({request.days} days)
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Current Month Salary Breakdown
          </CardTitle>
          <CardDescription>
            Detailed view of your current month's compensation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                ${salaryInfo.currentMonth.basicSalary.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Basic Salary</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                +${salaryInfo.currentMonth.allowances.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Allowances</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">
                -${salaryInfo.currentMonth.deductions.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Deductions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                ${salaryInfo.currentMonth.netSalary.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Net Salary</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks you can perform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              <div className="font-medium">Apply for Leave</div>
              <div className="text-xs text-muted-foreground mt-1">Submit new leave request</div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <div className="font-medium">View Salary Slip</div>
              <div className="text-xs text-muted-foreground mt-1">Download latest payslip</div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <User className="h-6 w-6 mb-2" />
              <div className="font-medium">Update Profile</div>
              <div className="text-xs text-muted-foreground mt-1">Edit personal details</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;