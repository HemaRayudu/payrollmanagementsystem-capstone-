import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  DollarSign,
  Users,
  TrendingUp,
  Building
} from 'lucide-react';

interface JobRole {
  id: number;
  title: string;
  department: string;
  level: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'manager' | 'director';
  minSalary: number;
  maxSalary: number;
  description: string;
  requirements: string[];
  responsibilities: string[];
  employeeCount: number;
  status: 'active' | 'inactive';
}

const JobManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);

  const [jobs, setJobs] = useState<JobRole[]>([
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'IT',
      level: 'senior',
      minSalary: 70000,
      maxSalary: 90000,
      description: 'Lead development of complex software systems and mentor junior developers.',
      requirements: ['Bachelor\'s in Computer Science', '5+ years experience', 'React, TypeScript, Node.js', 'Team leadership'],
      responsibilities: ['Code architecture', 'Team mentoring', 'Technical documentation', 'Code reviews'],
      employeeCount: 8,
      status: 'active'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      department: 'Marketing',
      level: 'manager',
      minSalary: 60000,
      maxSalary: 75000,
      description: 'Develop and execute marketing strategies to drive brand awareness and lead generation.',
      requirements: ['Bachelor\'s in Marketing', '3+ years management experience', 'Digital marketing expertise', 'Analytics skills'],
      responsibilities: ['Campaign management', 'Team leadership', 'Budget planning', 'Performance analysis'],
      employeeCount: 5,
      status: 'active'
    },
    {
      id: 3,
      title: 'HR Specialist',
      department: 'HR',
      level: 'mid',
      minSalary: 45000,
      maxSalary: 60000,
      description: 'Handle recruitment, employee relations, and HR policy implementation.',
      requirements: ['Bachelor\'s in HR or related field', '2+ years HR experience', 'SHRM certification preferred', 'Strong communication'],
      responsibilities: ['Recruitment', 'Employee onboarding', 'Policy enforcement', 'Conflict resolution'],
      employeeCount: 3,
      status: 'active'
    },
    {
      id: 4,
      title: 'Financial Analyst',
      department: 'Finance',
      level: 'mid',
      minSalary: 50000,
      maxSalary: 70000,
      description: 'Analyze financial data and provide insights for business decision making.',
      requirements: ['Bachelor\'s in Finance/Accounting', 'CPA preferred', 'Advanced Excel skills', 'Financial modeling'],
      responsibilities: ['Financial reporting', 'Budget analysis', 'Forecasting', 'Variance analysis'],
      employeeCount: 6,
      status: 'active'
    },
    {
      id: 5,
      title: 'Sales Director',
      department: 'Sales',
      level: 'director',
      minSalary: 80000,
      maxSalary: 120000,
      description: 'Lead sales organization and develop strategic sales initiatives.',
      requirements: ['Bachelor\'s degree', '7+ years sales experience', 'Management experience', 'CRM expertise'],
      responsibilities: ['Sales strategy', 'Team leadership', 'Client relationships', 'Revenue growth'],
      employeeCount: 12,
      status: 'active'
    },
    {
      id: 6,
      title: 'Junior Developer',
      department: 'IT',
      level: 'junior',
      minSalary: 40000,
      maxSalary: 55000,
      description: 'Entry-level position for recent graduates to start their development career.',
      requirements: ['Bachelor\'s in Computer Science', 'Basic programming knowledge', 'Willingness to learn', 'Problem-solving skills'],
      responsibilities: ['Code implementation', 'Bug fixes', 'Testing', 'Documentation'],
      employeeCount: 0,
      status: 'inactive'
    }
  ]);

  const [newJob, setNewJob] = useState<Partial<JobRole>>({
    title: '',
    department: '',
    level: 'entry',
    minSalary: 0,
    maxSalary: 0,
    description: '',
    requirements: [],
    responsibilities: [],
    status: 'active'
  });

  const departments = ['IT', 'Marketing', 'HR', 'Finance', 'Sales', 'Operations'];
  const levels = ['entry', 'junior', 'mid', 'senior', 'lead', 'manager', 'director'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
    const matchesLevel = levelFilter === 'all' || job.level === levelFilter;
    
    return matchesSearch && matchesDepartment && matchesLevel;
  });

  const handleAddJob = () => {
    if (!newJob.title || !newJob.department || !newJob.description) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields."
      });
      return;
    }

    const job: JobRole = {
      ...newJob as JobRole,
      id: Math.max(...jobs.map(j => j.id)) + 1,
      employeeCount: 0,
      requirements: newJob.requirements || [],
      responsibilities: newJob.responsibilities || []
    };

    setJobs([...jobs, job]);
    setNewJob({
      title: '',
      department: '',
      level: 'entry',
      minSalary: 0,
      maxSalary: 0,
      description: '',
      requirements: [],
      responsibilities: [],
      status: 'active'
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Success",
      description: "Job role added successfully."
    });
  };

  const handleEditJob = () => {
    if (!selectedJob) return;

    setJobs(jobs.map(job =>
      job.id === selectedJob.id ? selectedJob : job
    ));
    setIsEditDialogOpen(false);
    setSelectedJob(null);

    toast({
      title: "Success",
      description: "Job role updated successfully."
    });
  };

  const handleDeleteJob = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
    toast({
      title: "Success",
      description: "Job role deleted successfully."
    });
  };

  const openEditDialog = (job: JobRole) => {
    setSelectedJob({ ...job });
    setIsEditDialogOpen(true);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'entry':
      case 'junior':
        return 'bg-muted text-muted-foreground';
      case 'mid':
        return 'bg-primary text-primary-foreground';
      case 'senior':
      case 'lead':
        return 'bg-success text-success-foreground';
      case 'manager':
      case 'director':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const jobStats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(job => job.status === 'active').length,
    totalPositions: jobs.reduce((sum, job) => sum + job.employeeCount, 0),
    avgSalary: Math.round(jobs.reduce((sum, job) => sum + ((job.minSalary + job.maxSalary) / 2), 0) / jobs.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Roles Management</h1>
          <p className="text-muted-foreground mt-1">
            Define and manage organizational job positions and salary structures
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Job Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Job Role</DialogTitle>
              <DialogDescription>
                Create a new job position with salary range and requirements.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 py-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={newJob.title || ''}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select value={newJob.department || ''} onValueChange={(value) => setNewJob({ ...newJob, department: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={newJob.level || 'entry'} onValueChange={(value: any) => setNewJob({ ...newJob, level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minSalary">Min Salary</Label>
                  <Input
                    id="minSalary"
                    type="number"
                    value={newJob.minSalary || ''}
                    onChange={(e) => setNewJob({ ...newJob, minSalary: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxSalary">Max Salary</Label>
                  <Input
                    id="maxSalary"
                    type="number"
                    value={newJob.maxSalary || ''}
                    onChange={(e) => setNewJob({ ...newJob, maxSalary: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newJob.description || ''}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="Job description and overview"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Enter requirements separated by commas"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibilities">Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  placeholder="Enter responsibilities separated by commas"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newJob.status || 'active'} onValueChange={(value: 'active' | 'inactive') => setNewJob({ ...newJob, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddJob}>
                Add Job Role
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Job Roles</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobStats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">{jobStats.activeJobs} active roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Positions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobStats.totalPositions}</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Salary Range</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${jobStats.avgSalary.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Midpoint average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search job roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{job.department}</Badge>
                    <Badge className={getLevelColor(job.level)}>{job.level}</Badge>
                    <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(job)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {job.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Salary Range</span>
                  <span className="font-bold">
                    ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Current Employees
                  </span>
                  <span className="font-bold">{job.employeeCount}</span>
                </div>
              </div>

              {job.requirements.length > 0 && (
                <div>
                  <span className="text-sm font-medium">Key Requirements:</span>
                  <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside">
                    {job.requirements.slice(0, 2).map((req, index) => (
                      <li key={index} className="truncate">{req}</li>
                    ))}
                    {job.requirements.length > 2 && (
                      <li>+{job.requirements.length - 2} more...</li>
                    )}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Job Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Job Role</DialogTitle>
            <DialogDescription>
              Update job position details and requirements.
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="grid grid-cols-1 gap-4 py-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editTitle">Job Title *</Label>
                  <Input
                    id="editTitle"
                    value={selectedJob.title}
                    onChange={(e) => setSelectedJob({ ...selectedJob, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDepartment">Department *</Label>
                  <Select value={selectedJob.department} onValueChange={(value) => setSelectedJob({ ...selectedJob, department: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editLevel">Level</Label>
                  <Select value={selectedJob.level} onValueChange={(value: any) => setSelectedJob({ ...selectedJob, level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editMinSalary">Min Salary</Label>
                  <Input
                    id="editMinSalary"
                    type="number"
                    value={selectedJob.minSalary}
                    onChange={(e) => setSelectedJob({ ...selectedJob, minSalary: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editMaxSalary">Max Salary</Label>
                  <Input
                    id="editMaxSalary"
                    type="number"
                    value={selectedJob.maxSalary}
                    onChange={(e) => setSelectedJob({ ...selectedJob, maxSalary: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editDescription">Description *</Label>
                <Textarea
                  id="editDescription"
                  value={selectedJob.description}
                  onChange={(e) => setSelectedJob({ ...selectedJob, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editStatus">Status</Label>
                <Select value={selectedJob.status} onValueChange={(value: 'active' | 'inactive') => setSelectedJob({ ...selectedJob, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditJob}>
              Update Job Role
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobManagement;