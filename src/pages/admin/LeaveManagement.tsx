import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Users,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface LeaveRequest {
  id: number;
  employeeName: string;
  employeeId: string;
  department: string;
  leaveType: 'annual' | 'sick' | 'personal' | 'maternity' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
}

const LeaveManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      employeeName: 'Alice Cooper',
      employeeId: 'EMP001',
      department: 'IT',
      leaveType: 'annual',
      startDate: '2024-04-15',
      endDate: '2024-04-19',
      days: 5,
      reason: 'Family vacation',
      status: 'pending',
      appliedDate: '2024-03-20'
    },
    {
      id: 2,
      employeeName: 'Bob Martinez',
      employeeId: 'EMP002',
      department: 'Marketing',
      leaveType: 'sick',
      startDate: '2024-03-25',
      endDate: '2024-03-26',
      days: 2,
      reason: 'Medical appointment',
      status: 'pending',
      appliedDate: '2024-03-22'
    },
    {
      id: 3,
      employeeName: 'Carol White',
      employeeId: 'EMP003',
      department: 'HR',
      leaveType: 'personal',
      startDate: '2024-04-01',
      endDate: '2024-04-01',
      days: 1,
      reason: 'Personal matters',
      status: 'approved',
      appliedDate: '2024-03-18',
      approvedBy: 'John Admin',
      approvedDate: '2024-03-19'
    },
    {
      id: 4,
      employeeName: 'David Kim',
      employeeId: 'EMP004',
      department: 'Finance',
      leaveType: 'annual',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      days: 6,
      reason: 'Spring break vacation',
      status: 'rejected',
      appliedDate: '2024-03-10',
      rejectionReason: 'Peak business period, please apply for different dates'
    },
    {
      id: 5,
      employeeName: 'Emma Johnson',
      employeeId: 'EMP005',
      department: 'Sales',
      leaveType: 'maternity',
      startDate: '2024-05-01',
      endDate: '2024-08-01',
      days: 92,
      reason: 'Maternity leave',
      status: 'approved',
      appliedDate: '2024-02-15',
      approvedBy: 'John Admin',
      approvedDate: '2024-02-16'
    },
    {
      id: 6,
      employeeName: 'Frank Wilson',
      employeeId: 'EMP006',
      department: 'IT',
      leaveType: 'emergency',
      startDate: '2024-03-28',
      endDate: '2024-03-29',
      days: 2,
      reason: 'Family emergency',
      status: 'pending',
      appliedDate: '2024-03-27'
    }
  ]);

  const leaveStats = {
    totalRequests: leaveRequests.length,
    pending: leaveRequests.filter(req => req.status === 'pending').length,
    approved: leaveRequests.filter(req => req.status === 'approved').length,
    rejected: leaveRequests.filter(req => req.status === 'rejected').length,
    avgDays: Math.round(leaveRequests.reduce((sum, req) => sum + req.days, 0) / leaveRequests.length)
  };

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = 
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || request.department === departmentFilter;
    const matchesLeaveType = leaveTypeFilter === 'all' || request.leaveType === leaveTypeFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesLeaveType;
  });

  const handleApprove = (requestId: number) => {
    setLeaveRequests(requests =>
      requests.map(req =>
        req.id === requestId
          ? {
              ...req,
              status: 'approved' as const,
              approvedBy: 'John Admin',
              approvedDate: new Date().toISOString().split('T')[0]
            }
          : req
      )
    );

    toast({
      title: "Leave Approved",
      description: "The leave request has been approved successfully."
    });
  };

  const handleReject = (requestId: number) => {
    setLeaveRequests(requests =>
      requests.map(req =>
        req.id === requestId
          ? {
              ...req,
              status: 'rejected' as const,
              rejectionReason: rejectionReason || 'No reason provided'
            }
          : req
      )
    );

    setRejectionReason('');
    setSelectedRequest(null);

    toast({
      title: "Leave Rejected",
      description: "The leave request has been rejected."
    });
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
        return XCircle;
      case 'pending':
        return Clock;
      default:
        return Clock;
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'annual':
        return 'bg-primary text-primary-foreground';
      case 'sick':
        return 'bg-destructive text-destructive-foreground';
      case 'personal':
        return 'bg-secondary text-secondary-foreground';
      case 'maternity':
        return 'bg-success text-success-foreground';
      case 'emergency':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage employee leave requests
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveStats.totalRequests}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{leaveStats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{leaveStats.approved}</div>
            <p className="text-xs text-muted-foreground">Approved requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{leaveStats.rejected}</div>
            <p className="text-xs text-muted-foreground">Rejected requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Days</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveStats.avgDays}</div>
            <p className="text-xs text-muted-foreground">Per request</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
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
            <Select value={leaveTypeFilter} onValueChange={setLeaveTypeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leave Types</SelectItem>
                <SelectItem value="annual">Annual Leave</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="personal">Personal Leave</SelectItem>
                <SelectItem value="maternity">Maternity Leave</SelectItem>
                <SelectItem value="emergency">Emergency Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Leave Requests ({filteredRequests.length})
          </CardTitle>
          <CardDescription>
            Review and approve employee leave requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-table-header">
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <TableRow key={request.id} className="hover:bg-table-row-hover">
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.employeeName}</div>
                          <div className="text-sm text-muted-foreground">
                            {request.employeeId} - {request.department}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getLeaveTypeColor(request.leaveType)}>
                          {request.leaveType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.days} days</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                      <TableCell>{new Date(request.appliedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {request.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApprove(request.id)}
                                className="text-success hover:text-success"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedRequest(request)}
                                className="text-destructive hover:text-destructive"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
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

      {/* Request Details Modal */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>
              Review the complete leave request information
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Employee Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Employee</label>
                  <p className="text-lg">{selectedRequest.employeeName}</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.employeeId} - {selectedRequest.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Leave Type</label>
                  <div className="mt-1">
                    <Badge className={getLeaveTypeColor(selectedRequest.leaveType)}>
                      {selectedRequest.leaveType}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Leave Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <p>{new Date(selectedRequest.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <p>{new Date(selectedRequest.endDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Duration</label>
                <p className="text-lg font-bold">{selectedRequest.days} days</p>
              </div>

              <div>
                <label className="text-sm font-medium">Reason</label>
                <p className="mt-1">{selectedRequest.reason}</p>
              </div>

              {/* Status Info */}
              <div>
                <label className="text-sm font-medium">Current Status</label>
                <div className="mt-1">
                  <Badge className={getStatusColor(selectedRequest.status)}>
                    {selectedRequest.status}
                  </Badge>
                </div>
              </div>

              {selectedRequest.approvedBy && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Approved By</label>
                    <p>{selectedRequest.approvedBy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Approved Date</label>
                    <p>{selectedRequest.approvedDate ? new Date(selectedRequest.approvedDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              )}

              {selectedRequest.rejectionReason && (
                <div>
                  <label className="text-sm font-medium">Rejection Reason</label>
                  <p className="mt-1 text-destructive">{selectedRequest.rejectionReason}</p>
                </div>
              )}

              {/* Actions for pending requests */}
              {selectedRequest.status === 'pending' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Rejection Reason (if rejecting)</label>
                    <Textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Provide reason for rejection..."
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => handleReject(selectedRequest.id)}
                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(selectedRequest.id)}
                      className="bg-success text-success-foreground hover:bg-success/90"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              )}

              {selectedRequest.status !== 'pending' && (
                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                    Close
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveManagement;