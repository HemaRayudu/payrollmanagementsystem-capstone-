import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Building, Plus, Edit, Trash2, Users, Search } from 'lucide-react';

interface Department {
  id: number;
  name: string;
  description: string;
  headOfDepartment: string;
  employeeCount: number;
  budget: number;
  location: string;
}

const DepartmentManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: 'Information Technology',
      description: 'Responsible for software development, system administration, and IT support.',
      headOfDepartment: 'John Smith',
      employeeCount: 25,
      budget: 500000,
      location: 'Floor 3, Building A'
    },
    {
      id: 2,
      name: 'Human Resources',
      description: 'Manages employee relations, recruitment, and organizational development.',
      headOfDepartment: 'Sarah Johnson',
      employeeCount: 8,
      budget: 150000,
      location: 'Floor 2, Building A'
    },
    {
      id: 3,
      name: 'Marketing',
      description: 'Handles brand management, advertising, and market research.',
      headOfDepartment: 'Mike Davis',
      employeeCount: 15,
      budget: 300000,
      location: 'Floor 4, Building A'
    },
    {
      id: 4,
      name: 'Finance',
      description: 'Manages financial planning, accounting, and budget control.',
      headOfDepartment: 'Lisa Wilson',
      employeeCount: 12,
      budget: 200000,
      location: 'Floor 1, Building A'
    },
    {
      id: 5,
      name: 'Sales',
      description: 'Responsible for revenue generation and customer relationships.',
      headOfDepartment: 'Robert Brown',
      employeeCount: 20,
      budget: 400000,
      location: 'Floor 5, Building A'
    }
  ]);

  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({
    name: '',
    description: '',
    headOfDepartment: '',
    budget: 0,
    location: ''
  });

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.headOfDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.description) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields."
      });
      return;
    }

    const department: Department = {
      ...newDepartment as Department,
      id: Math.max(...departments.map(d => d.id)) + 1,
      employeeCount: 0
    };

    setDepartments([...departments, department]);
    setNewDepartment({
      name: '',
      description: '',
      headOfDepartment: '',
      budget: 0,
      location: ''
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Success",
      description: "Department added successfully."
    });
  };

  const handleEditDepartment = () => {
    if (!selectedDepartment) return;

    setDepartments(departments.map(dept =>
      dept.id === selectedDepartment.id ? selectedDepartment : dept
    ));
    setIsEditDialogOpen(false);
    setSelectedDepartment(null);

    toast({
      title: "Success",
      description: "Department updated successfully."
    });
  };

  const handleDeleteDepartment = (id: number) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    toast({
      title: "Success",
      description: "Department deleted successfully."
    });
  };

  const openEditDialog = (department: Department) => {
    setSelectedDepartment({ ...department });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Department Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage organizational departments and their information
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>
                Create a new department with its basic information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Department Name *</Label>
                <Input
                  id="name"
                  value={newDepartment.name || ''}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                  placeholder="e.g., Information Technology"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newDepartment.description || ''}
                  onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                  placeholder="Brief description of the department's responsibilities"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="head">Head of Department</Label>
                  <Input
                    id="head"
                    value={newDepartment.headOfDepartment || ''}
                    onChange={(e) => setNewDepartment({ ...newDepartment, headOfDepartment: e.target.value })}
                    placeholder="Department manager/head"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Annual Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={newDepartment.budget || ''}
                    onChange={(e) => setNewDepartment({ ...newDepartment, budget: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newDepartment.location || ''}
                  onChange={(e) => setNewDepartment({ ...newDepartment, location: e.target.value })}
                  placeholder="Physical location of the department"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDepartment}>
                Add Department
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{department.name}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(department)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteDepartment(department.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{department.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Head of Department</span>
                  <span className="font-medium">{department.headOfDepartment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Employees
                  </span>
                  <span className="font-medium">{department.employeeCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Annual Budget</span>
                  <span className="font-medium">${department.budget.toLocaleString()}</span>
                </div>
                {department.location && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="font-medium text-sm">{department.location}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Department Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Update department information.
            </DialogDescription>
          </DialogHeader>
          {selectedDepartment && (
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editName">Department Name *</Label>
                <Input
                  id="editName"
                  value={selectedDepartment.name}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editDescription">Description *</Label>
                <Textarea
                  id="editDescription"
                  value={selectedDepartment.description}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editHead">Head of Department</Label>
                  <Input
                    id="editHead"
                    value={selectedDepartment.headOfDepartment}
                    onChange={(e) => setSelectedDepartment({ ...selectedDepartment, headOfDepartment: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editBudget">Annual Budget</Label>
                  <Input
                    id="editBudget"
                    type="number"
                    value={selectedDepartment.budget}
                    onChange={(e) => setSelectedDepartment({ ...selectedDepartment, budget: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLocation">Location</Label>
                <Input
                  id="editLocation"
                  value={selectedDepartment.location}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, location: e.target.value })}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditDepartment}>
              Update Department
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentManagement;