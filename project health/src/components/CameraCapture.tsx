import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Upload, FileText, Eye, Download, Trash2, Scan, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ScannedDocument {
  id: string;
  name: string;
  type: string;
  extractedText: string;
  category: string;
  confidence: number;
  uploadDate: string;
  imageUrl: string;
}

const CameraCapture = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<ScannedDocument | null>(null);
  const [scannedDocs, setScannedDocs] = useState<ScannedDocument[]>([
    {
      id: '1',
      name: 'Blood Test Report',
      type: 'Lab Report',
      extractedText: 'Complete Blood Count\nHemoglobin: 14.2 g/dL (Normal)\nWhite Blood Cells: 7,200/μL (Normal)\nPlatelet Count: 250,000/μL (Normal)\nGlucose: 95 mg/dL (Normal)',
      category: 'Lab Report',
      confidence: 92,
      uploadDate: '2024-09-03',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Prescription',
      type: 'Prescription',
      extractedText: 'Patient: John Doe\nMedication: Metformin 500mg\nDosage: Take twice daily with meals\nQuantity: 60 tablets\nRefills: 2',
      category: 'Prescription',
      confidence: 88,
      uploadDate: '2024-09-02',
      imageUrl: '/placeholder.svg'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processDocument(file);
    }
  };

  const processDocument = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockExtractedText = `Document processed via OCR
    Date: ${new Date().toLocaleDateString()}
    Document Type: ${file.type.includes('image') ? 'Scanned Image' : 'Digital Document'}
    
    Sample extracted text from ${file.name}:
    - Patient information detected
    - Medical terminology identified
    - Date stamps found
    - Numerical values extracted`;

    const newDoc: ScannedDocument = {
      id: Date.now().toString(),
      name: file.name,
      type: 'Scanned Document',
      extractedText: mockExtractedText,
      category: detectCategory(file.name),
      confidence: Math.floor(Math.random() * 20) + 80,
      uploadDate: new Date().toISOString().split('T')[0],
      imageUrl: URL.createObjectURL(file)
    };

    setScannedDocs([newDoc, ...scannedDocs]);
    setIsProcessing(false);

    toast({
      title: "Document Processed",
      description: `Successfully extracted text from ${file.name}`,
    });
  };

  const detectCategory = (filename: string): string => {
    const lower = filename.toLowerCase();
    if (lower.includes('prescription') || lower.includes('rx')) return 'Prescription';
    if (lower.includes('lab') || lower.includes('blood') || lower.includes('test')) return 'Lab Report';
    if (lower.includes('x-ray') || lower.includes('mri') || lower.includes('scan')) return 'Imaging';
    if (lower.includes('bill') || lower.includes('invoice')) return 'Bill';
    return 'Other';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Lab Report': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Prescription': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Imaging': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Bill': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const deleteDocument = (id: string) => {
    setScannedDocs(scannedDocs.filter(doc => doc.id !== id));
    toast({
      title: "Document Deleted",
      description: "Document removed successfully",
    });
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Scan className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-3xl font-bold">Document Scanner & OCR</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Scan paper documents, extract text using AI, and organize them automatically
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Capture Document
                </CardTitle>
                <CardDescription>
                  Take a photo or upload an image for OCR processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full gap-2"
                  disabled={isProcessing}
                >
                  <Camera className="h-4 w-4" />
                  {isProcessing ? 'Processing...' : 'Take Photo / Upload'}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Supported formats: JPG, PNG, PDF
                  </p>
                </div>

                {isProcessing && (
                  <div className="bg-accent p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm font-medium">Processing Document...</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Extracting text and categorizing content
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Auto-Detection Features:</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Text extraction (OCR)
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Auto-categorization
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Date detection
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Medical term recognition
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scanned Documents */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Scanned Documents</CardTitle>
                <CardDescription>
                  View and manage your processed documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scannedDocs.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <h4 className="font-medium truncate">{doc.name}</h4>
                            <Badge className={getCategoryColor(doc.category)}>
                              {doc.category}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span>Uploaded: {doc.uploadDate}</span>
                            <span>Confidence: {doc.confidence}%</span>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {doc.extractedText.substring(0, 150)}...
                          </p>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedDoc(doc)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{doc.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <Badge className={getCategoryColor(doc.category)}>
                                    {doc.category}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    Confidence: {doc.confidence}%
                                  </span>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Extracted Text:</h4>
                                  <Textarea
                                    value={doc.extractedText}
                                    readOnly
                                    className="min-h-[200px]"
                                  />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>

                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteDocument(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CameraCapture;