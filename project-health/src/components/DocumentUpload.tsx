import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  FileText, 
  Camera, 
  FolderOpen,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Trash2
} from 'lucide-react';

const DocumentUpload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  
  const documentCategories = [
    {
      name: 'Lab Reports',
      icon: FileText,
      count: 12,
      color: 'bg-primary/10 text-primary'
    },
    {
      name: 'Prescriptions',
      icon: FileText,
      count: 8,
      color: 'bg-secondary/10 text-secondary'
    },
    {
      name: 'Hospital Bills',
      icon: FolderOpen,
      count: 5,
      color: 'bg-accent/10 text-accent'
    },
    {
      name: 'Imaging Reports',
      icon: Camera,
      count: 3,
      color: 'bg-warning/10 text-warning'
    }
  ];

  const recentDocuments = [
    {
      name: 'Blood Test Report - Apollo Hospital',
      date: '2024-01-15',
      type: 'Lab Report',
      status: 'processed',
      size: '2.4 MB'
    },
    {
      name: 'Cardiology Prescription - Dr. Smith',
      date: '2024-01-12', 
      type: 'Prescription',
      status: 'processing',
      size: '1.1 MB'
    },
    {
      name: 'X-Ray Chest - City Hospital',
      date: '2024-01-10',
      type: 'Imaging',
      status: 'processed',
      size: '5.2 MB'
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Secure Document Storage</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload, organize, and access your medical documents with military-grade security and AI-powered organization.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="xl:col-span-2 space-y-6">
            {/* Drag & Drop Upload */}
            <Card className="health-card">
              <CardContent className="p-8">
                <div 
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                    isDragOver 
                      ? 'border-primary bg-primary/5 scale-105' 
                      : 'border-muted-foreground/30 hover:border-primary/50'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    // Handle file drop
                  }}
                >
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Drop your documents here</h3>
                  <p className="text-muted-foreground mb-6">
                    or click to browse files from your device
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button className="btn-health">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                    <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported formats: PDF, JPG, PNG • Max size: 10MB per file
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Documents */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Recent Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.map((doc, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{doc.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{doc.date}</span>
                          <span>•</span>
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        {doc.status === 'processed' ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-warning pulse-animation" />
                        )}
                        
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories Sidebar */}
          <div className="space-y-6">
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  Document Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documentCategories.map((category, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                        <category.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-muted-foreground">{category.count} documents</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Processing Info */}
            <Card className="health-card health-glow border-primary/20">
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold">AI-Powered Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI automatically extracts text, categorizes documents, and identifies key medical information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;