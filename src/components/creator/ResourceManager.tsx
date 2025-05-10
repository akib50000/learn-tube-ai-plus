
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Download, FileText, Link, Plus, Trash, Upload } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'zip' | 'doc' | 'link';
  url: string;
  size?: string;
}

const ResourceManager = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'pdf' | 'zip' | 'doc' | 'link'>('pdf');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setTitle(selectedFile.name.split('.')[0]); // Set title to filename without extension
      
      // Try to determine file type from the extension
      const extension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (extension === 'pdf') setType('pdf');
      else if (extension === 'zip') setType('zip');
      else if (extension === 'doc' || extension === 'docx') setType('doc');
      else setType('pdf'); // Default to PDF
    }
  };

  const handleAddResource = () => {
    if (!title) {
      toast({
        title: "Error",
        description: "Please provide a title for the resource",
        variant: "destructive"
      });
      return;
    }

    if (type === 'link' && !url) {
      toast({
        title: "Error",
        description: "Please provide a URL for the link resource",
        variant: "destructive"
      });
      return;
    }

    if (type !== 'link' && !file) {
      toast({
        title: "Error",
        description: "Please upload a file",
        variant: "destructive"
      });
      return;
    }

    const newResource: Resource = {
      id: `resource-${Date.now()}`,
      title,
      type,
      url: type === 'link' ? url : file ? URL.createObjectURL(file) : '',
      size: file ? formatFileSize(file.size) : undefined
    };

    setResources([...resources, newResource]);
    
    // Reset form
    setTitle('');
    setType('pdf');
    setUrl('');
    setFile(null);
    
    toast({
      title: "Resource Added",
      description: `"${title}" has been added to your course resources`
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getIconForType = (resourceType: string) => {
    switch(resourceType) {
      case 'pdf': return '📄';
      case 'zip': return '🗃️';
      case 'doc': return '📝';
      case 'link': return '🔗';
      default: return '📁';
    }
  };

  const handleRemoveResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
    toast({
      title: "Resource Removed",
      description: "Resource has been removed from your course"
    });
  };

  const handleSaveResources = () => {
    toast({
      title: "Resources Saved",
      description: `${resources.length} resources have been saved to your course`
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Resource Manager</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="resource-title">Resource Title</Label>
            <Input 
              id="resource-title" 
              placeholder="Enter resource title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="resource-type">Resource Type</Label>
            <Select 
              value={type} 
              onValueChange={(value: 'pdf' | 'zip' | 'doc' | 'link') => setType(value)}
            >
              <SelectTrigger id="resource-type">
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="zip">Archive (ZIP)</SelectItem>
                <SelectItem value="doc">Document (DOC/DOCX)</SelectItem>
                <SelectItem value="link">External Link</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {type === 'link' ? (
            <div>
              <Label htmlFor="resource-url">URL</Label>
              <Input 
                id="resource-url" 
                placeholder="https://example.com" 
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="resource-file">Upload File</Label>
              <div className="mt-1 flex items-center">
                <Input
                  id="resource-file"
                  type="file"
                  accept={type === 'pdf' ? '.pdf' : type === 'zip' ? '.zip' : '.doc,.docx'}
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label 
                  htmlFor="resource-file" 
                  className="cursor-pointer flex items-center gap-2 border rounded px-4 py-2 bg-gray-50 dark:bg-gray-700"
                >
                  <Upload className="h-4 w-4" />
                  <span>{file ? file.name : 'Choose file'}</span>
                </label>
              </div>
            </div>
          )}
          
          <Button onClick={handleAddResource} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </div>
      </div>
      
      {resources.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Resource List ({resources.length})</h2>
            <Button onClick={handleSaveResources}>
              Save All Resources
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {resources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-md flex items-center">
                      <span className="text-xl mr-2">{getIconForType(resource.type)}</span>
                      {resource.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        asChild
                      >
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          {resource.type === 'link' ? <Link className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveResource(resource.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex items-center text-sm space-x-4">
                    <span>
                      <span className="font-medium">Type:</span>{' '}
                      {resource.type === 'pdf' ? 'PDF Document' :
                       resource.type === 'zip' ? 'Archive (ZIP)' :
                       resource.type === 'doc' ? 'Document' : 'External Link'}
                    </span>
                    
                    {resource.size && (
                      <span>
                        <span className="font-medium">Size:</span> {resource.size}
                      </span>
                    )}
                    
                    {resource.type === 'link' && (
                      <span className="truncate max-w-xs">
                        <span className="font-medium">URL:</span>{' '}
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {resource.url}
                        </a>
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceManager;
