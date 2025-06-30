
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Upload, FileText, Download, Eye, Trash2 } from 'lucide-react';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    {
      id: 1,
      name: 'Lab_Results_John_Smith.pdf',
      patient: 'John Smith',
      type: 'Lab Results',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      category: 'medical',
    },
    {
      id: 2,
      name: 'X_Ray_Emma_Wilson.jpg',
      patient: 'Emma Wilson',
      type: 'X-Ray',
      size: '5.1 MB',
      uploadDate: '2024-01-14',
      category: 'imaging',
    },
    {
      id: 3,
      name: 'Prescription_Michael_Brown.pdf',
      patient: 'Michael Brown',
      type: 'Prescription',
      size: '156 KB',
      uploadDate: '2024-01-13',
      category: 'prescription',
    },
    {
      id: 4,
      name: 'Insurance_Sarah_Davis.pdf',
      patient: 'Sarah Davis',
      type: 'Insurance',
      size: '892 KB',
      uploadDate: '2024-01-12',
      category: 'administrative',
    },
  ];

  const filteredDocuments = documents.filter(document =>
    document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    document.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    document.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical':
        return 'bg-blue-100 text-blue-800';
      case 'imaging':
        return 'bg-green-100 text-green-800';
      case 'prescription':
        return 'bg-purple-100 text-purple-800';
      case 'administrative':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Documents</h1>
          <p className="text-slate-600 mt-1">Manage patient documents and medical records</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Search and Upload */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search documents by name, patient, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'Medical Records', count: 45, color: 'bg-blue-50 border-blue-200' },
          { name: 'Lab Results', count: 23, color: 'bg-green-50 border-green-200' },
          { name: 'Prescriptions', count: 67, color: 'bg-purple-50 border-purple-200' },
          { name: 'Administrative', count: 12, color: 'bg-orange-50 border-orange-200' },
        ].map((category) => (
          <Card key={category.name} className={`${category.color} cursor-pointer hover:shadow-md transition-shadow`}>
            <CardContent className="p-4 text-center">
              <h3 className="font-medium text-slate-900">{category.name}</h3>
              <p className="text-2xl font-bold text-slate-700 mt-1">{category.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Documents
          </CardTitle>
          <CardDescription>
            {filteredDocuments.length} documents found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">{document.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-sm text-slate-600">{document.patient}</p>
                      <Badge className={`text-xs ${getCategoryColor(document.category)}`}>
                        {document.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {document.size} • Uploaded on {new Date(document.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No documents found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or upload a new document.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Documents;
