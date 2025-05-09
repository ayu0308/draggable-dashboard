import { useEffect, useState } from 'react';
import logo from '../assets/dashform_blue_icon.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DSRSidebar } from './form-sidebar';

export interface LeftNewFormBuilderProps {
    onLogoChange: (logoUrl: string) => void;
    onHeaderDescriptionChange: (description: string) => void;
    initialLogoUrl?: string;
    initialHeaderDescription?: string;
    activeTab: 'basic' | 'elements';
    setActiveTab: (tab: 'basic' | 'elements') => void;
  }

function LeftNewFormBuilder({
  onLogoChange,
  onHeaderDescriptionChange,
  initialLogoUrl,
  activeTab,
  setActiveTab,
  initialHeaderDescription,
}: LeftNewFormBuilderProps) {
  const [logoUrl, setLogoUrl] = useState<string>(initialLogoUrl || logo);
  const [headerDescription, setHeaderDescription] = useState<string>(
    initialHeaderDescription ||
      'GoTrust Inc., including all its affiliates ("Company", "we," "our," and "us"), values the privacy rights of our customers, business partners, suppliers, vendors, users, and others. As required under applicable law, and specifically under the EU General Data Protection Regulation ("GDPR"), UK GDPR, and the California Consumer Privacy Act of 2018 ("CCPA") (collectively "Data Protection Laws"), individuals (including European Union and UK residents, and California residents, respectively) are permitted to make certain requests regarding our processing of their Personal Data.'
  );

  useEffect(() => {
    setLogoUrl(initialLogoUrl || logo);
  }, [initialLogoUrl]);

  useEffect(() => {
    if (initialHeaderDescription) {
      setHeaderDescription(initialHeaderDescription);
    }
  }, [initialHeaderDescription]);

  const handleHeaderDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value;
    setHeaderDescription(newDescription);
    onHeaderDescriptionChange(newDescription);
  };

//   const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       toast.loading('Uploading logo...');
//       try {
//         const response = await uploadDocument(file);
//         const newLogoUrl = response.result[0].url;
//         setLogoUrl(newLogoUrl);
//         onLogoChange(newLogoUrl);
//         toast.dismiss();
//         toast.success('Logo uploaded successfully');
//       } catch (error) {
//         toast.dismiss();
//         toast.error('Failed to upload logo');
//       }
//     }
//   };

  return (
    <div className="w-full overflow-auto rounded-md bg-white py-2 lg:w-80">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="basic"
            onClick={() => setActiveTab('basic')}
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Basic
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setActiveTab('elements')}
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
            value="elements"
          >
            Elements
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="space-y-6">
          <Separator className="bg-gray-300" />
          <div className="px-3">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Upload Logo</Label>
              <div className="relative">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                //   onChange={handleLogoChange}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  id="logo-upload"
                />
                <div className="flex flex-row items-center justify-between rounded-lg border border-gray-400 p-2">
                  <label
                    htmlFor="logo-upload"
                    className="hover:bg-primary-dark inline-flex cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-white"
                  >
                    Upload Logo
                  </label>
                  {logoUrl && (
                    <div className="mt-2">
                      <img src={logoUrl} alt="Logo" className="h-20 w-20 rounded-md" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label className="text-sm font-medium">Header Description</Label>
              <Textarea
                placeholder="Enter description"
                className="h-44 bg-gray-50 text-sm scrollbar-hide"
                value={headerDescription}
                onChange={handleHeaderDescriptionChange}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="elements" className="space-y-6">
          <Separator className="bg-gray-300" />
          <div className="px-3">
            <DSRSidebar />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


export default LeftNewFormBuilder;