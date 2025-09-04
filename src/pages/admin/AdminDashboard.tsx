import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Calendar, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Employees',
      value: '247',
      change: '+5 this month',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Monthly Payroll',
      value: '$485,230',
      change: '+12% from last month',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Pending Leaves',
      value: '8',
      change: '3 urgent reviews',
      icon: Calendar,
      trend: 'neutral'
    },
    {
      title: 'Active Departments',
      value: '12',
      change: 'No changes',
      icon: TrendingUp,
      trend: 'stable'
    }
  ];

  const recentActivities = [
    {
      type: 'payroll',
      message: 'March 2024 payroll processed successfully',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      type: 'employee',
      message: 'New employee Sarah Johnson added to IT Department',
      time: '4 hours ago',
      status: 'info'
    },
    {
      type: 'leave',
      message: 'Leave request from John Doe requires approval',
      time: '6 hours ago',
      status: 'pending'
    },
    {
      type: 'payroll',
      message: 'Salary structure updated for Marketing Department',
      time: '1 day ago',
      status: 'completed'
    }
  ];

  const pendingApprovals = [
    {
      employee: 'Alice Cooper',
      type: 'Annual Leave',
      duration: '5 days',
      status: 'pending'
    },
    {
      employee: 'Bob Martinez',
      type: 'Sick Leave',
      duration: '2 days',
      status: 'pending'
    },
    {
      employee: 'Carol White',
      type: 'Personal Leave',
      duration: '1 day',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your payroll system today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates and system activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'completed' ? 'bg-success' :
                    activity.status === 'pending' ? 'bg-warning' : 'bg-primary'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant={
                    activity.status === 'completed' ? 'default' :
                    activity.status === 'pending' ? 'secondary' : 'outline'
                  }>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Pending Approvals
            </CardTitle>
            <CardDescription>
              Leave requests awaiting your approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{approval.employee}</p>
                    <p className="text-sm text-muted-foreground">
                      {approval.type} - {approval.duration}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-success text-success-foreground text-xs rounded-md hover:bg-success/90 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-destructive text-destructive-foreground text-xs rounded-md hover:bg-destructive/90 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used administrative functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-left">
              <Users className="h-6 w-6 mb-2 text-primary" />
              <div className="font-medium">Add Employee</div>
              <div className="text-sm text-muted-foreground">Create new employee record</div>
            </button>
            <button className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-left">
              <DollarSign className="h-6 w-6 mb-2 text-primary" />
              <div className="font-medium">Process Payroll</div>
              <div className="text-sm text-muted-foreground">Run monthly payroll</div>
            </button>
            <button className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-left">
              <Calendar className="h-6 w-6 mb-2 text-primary" />
              <div className="font-medium">Review Leaves</div>
              <div className="text-sm text-muted-foreground">Approve pending requests</div>
            </button>
            <button className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-left">
              <TrendingUp className="h-6 w-6 mb-2 text-primary" />
              <div className="font-medium">Generate Reports</div>
              <div className="text-sm text-muted-foreground">View analytics</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;