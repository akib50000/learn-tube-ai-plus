
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Bell, Lock, User, Palette, CreditCard, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";

const SettingsPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
        variant: "success",
      });
    }, 800);
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
        variant: "success",
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar with user info */}
          <div className="md:w-1/4">
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Avatar className="h-20 w-20 mb-2">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-center">John Doe</CardTitle>
                  <CardDescription className="text-center">john.doe@example.com</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Account type</span>
                    <Badge variant="success">Premium</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Member since</span>
                    <span className="text-sm text-muted-foreground">Jan 2023</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="text-center">
                  <Button variant="outline" className="w-full">
                    View Public Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main settings area */}
          <div className="flex-1">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-6 grid grid-cols-2 sm:grid-cols-5 gap-2">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="billing" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Billing</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <form onSubmit={handleUpdateProfile}>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your profile information visible to other users.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Doe" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" disabled />
                          <p className="text-xs text-muted-foreground">
                            Contact support to change your email address.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="johndoe" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea
                            id="bio"
                            rows={4}
                            className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us about yourself..."
                            defaultValue="Software developer passionate about learning new technologies."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Profile Photo</Label>
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button type="button" variant="outline">Change Photo</Button>
                              <Button type="button" variant="outline" className="text-destructive hover:text-destructive">Remove</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button type="button" variant="outline">Cancel</Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Social Profiles</CardTitle>
                    <CardDescription>
                      Connect your social media accounts to enhance your profile.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-2 bg-muted rounded-l-md border-y border-l">
                          <Globe className="h-4 w-4" />
                        </div>
                        <Input id="website" className="rounded-l-none" placeholder="https://yourwebsite.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-2 bg-muted rounded-l-md border-y border-l">
                          <span className="text-[#1DA1F2]">𝕏</span>
                        </div>
                        <Input id="twitter" className="rounded-l-none" placeholder="@username" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-2 bg-muted rounded-l-md border-y border-l">
                          <span className="text-[#0A66C2] font-bold">in</span>
                        </div>
                        <Input id="linkedin" className="rounded-l-none" placeholder="linkedin.com/in/username" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Connect Accounts</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <form onSubmit={handlePasswordUpdate}>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your password to keep your account secure.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button type="button" variant="outline">Cancel</Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Password"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable 2FA</p>
                        <p className="text-sm text-muted-foreground">
                          Protect your account with two-factor authentication.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Sessions</CardTitle>
                    <CardDescription>
                      Manage your active sessions and sign out from other devices.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-md border flex justify-between items-center">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">
                            Chrome on macOS • IP: 192.168.1.1
                          </p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="p-3 rounded-md border flex justify-between items-center">
                        <div>
                          <p className="font-medium">Safari on iPhone</p>
                          <p className="text-xs text-muted-foreground">
                            Last active: 2 days ago
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Sign Out</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="text-destructive hover:text-destructive w-full">
                      Sign Out From All Devices
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose what notifications you want to receive.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about your courses and account.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Course Updates</p>
                          <p className="text-sm text-muted-foreground">
                            Notifications for new content in your enrolled courses.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Comments & Replies</p>
                          <p className="text-sm text-muted-foreground">
                            Notifications when someone replies to your comments.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional offers and new course announcements.
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Customize how LearnTube looks for you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base">Theme</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                          <div className="border rounded-md p-3 cursor-pointer hover:border-primary flex items-center gap-3">
                            <div className="h-5 w-5 rounded-full bg-white border"></div>
                            <span>Light</span>
                          </div>
                          <div className="border rounded-md p-3 cursor-pointer hover:border-primary flex items-center gap-3">
                            <div className="h-5 w-5 rounded-full bg-black border"></div>
                            <span>Dark</span>
                          </div>
                          <div className="border rounded-md p-3 cursor-pointer hover:border-primary flex items-center gap-3">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-white to-black border"></div>
                            <span>System</span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label className="text-base">Font Size</Label>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">A</span>
                          <input
                            type="range"
                            min="1"
                            max="3"
                            defaultValue="2"
                            className="w-full mx-4 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-lg font-bold">A</span>
                        </div>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Reduce Animations</p>
                          <p className="text-sm text-muted-foreground">
                            For users who prefer less motion on screen.
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Plan</CardTitle>
                    <CardDescription>
                      Manage your subscription and billing details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h3 className="font-bold text-lg">Premium Plan</h3>
                            <p className="text-sm text-muted-foreground">
                              Billed annually
                            </p>
                          </div>
                          <Badge variant="success">Active</Badge>
                        </div>
                        <div className="text-2xl font-bold mb-3">$99/year</div>
                        <div className="text-sm text-muted-foreground mb-4">
                          Your plan renews on October 15, 2023
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">Change Plan</Button>
                          <Button variant="outline" className="text-destructive hover:text-destructive">
                            Cancel Subscription
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3">Payment Method</h3>
                        <div className="p-3 border rounded-md flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-card p-1 border rounded">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">•••• •••• •••• 4242</p>
                              <p className="text-xs text-muted-foreground">
                                Expires 12/2024
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      View your recent transactions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <p className="font-medium">Premium Plan (Annual)</p>
                          <p className="text-xs text-muted-foreground">
                            Oct 15, 2022
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$99.00</p>
                          <Badge variant="outline" className="text-xs">Paid</Badge>
                        </div>
                      </div>
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <p className="font-medium">Premium Plan (Annual)</p>
                          <p className="text-xs text-muted-foreground">
                            Oct 15, 2021
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$99.00</p>
                          <Badge variant="outline" className="text-xs">Paid</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Download All Invoices
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
