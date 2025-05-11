
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/use-theme';
import { Bell, CreditCard, Globe, Lock, Mail, Moon, Sun, Upload, User } from 'lucide-react';
import Navbar from '@/components/Navbar';

const SettingsPage = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
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
    }, 1500);
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
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 shrink-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-medium">John Doe</h2>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
                
                <nav className="space-y-1">
                  <a href="#profile" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-accent text-accent-foreground font-medium">
                    <User className="h-4 w-4" />
                    Profile
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    Language & Region
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Billing
                  </a>
                </nav>
              </CardContent>
            </Card>
          </aside>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Settings</h1>
              <div className="flex items-center">
                <span className="text-sm mr-2">
                  {theme === "dark" ? "Dark" : "Light"} Mode
                </span>
                <Button
                  variant="outline" 
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details and public profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate}>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="avatar">Profile Picture</Label>
                          <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" type="button" className="gap-2">
                              <Upload className="h-4 w-4" />
                              Upload new image
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea
                            id="bio"
                            className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            defaultValue="Software engineer passionate about web development and learning new technologies."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Account Type</Label>
                          <div className="flex flex-wrap gap-4 pt-2">
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="learner" name="accountType" className="accent-learntube-red h-4 w-4" defaultChecked />
                              <Label htmlFor="learner" className="cursor-pointer">Learner</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="creator" name="accountType" className="accent-learntube-red h-4 w-4" />
                              <Label htmlFor="creator" className="cursor-pointer">Creator</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="both" name="accountType" className="accent-learntube-red h-4 w-4" />
                              <Label htmlFor="both" className="cursor-pointer">Both</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-end gap-4">
                        <Button type="button" variant="outline">Cancel</Button>
                        <Button 
                          type="submit" 
                          className="bg-learntube-red hover:bg-learntube-dark-red text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordUpdate}>
                      <div className="space-y-4">
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
                      </div>
                      
                      <div className="mt-6 flex justify-end gap-4">
                        <Button type="button" variant="outline">Cancel</Button>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Updating..." : "Update Password"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                      Manage your security preferences and login options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-muted-foreground" />
                            <h4 className="font-medium">Two-factor authentication</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <h4 className="font-medium">Login notifications</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Receive an email when a new login is detected
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Manage how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Email Notifications</h3>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="courseUpdates">Course updates</Label>
                              <p className="text-sm text-muted-foreground">
                                Get notified when courses you're enrolled in are updated
                              </p>
                            </div>
                            <Switch id="courseUpdates" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="announcements">Platform announcements</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive updates about new features and improvements
                              </p>
                            </div>
                            <Switch id="announcements" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="promotions">Promotions and offers</Label>
                              <p className="text-sm text-muted-foreground">
                                Get notified about special offers, discounts and promotions
                              </p>
                            </div>
                            <Switch id="promotions" />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Push Notifications</h3>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="comments">Comments on your content</Label>
                              <p className="text-sm text-muted-foreground">
                                When someone comments on your courses or tutorials
                              </p>
                            </div>
                            <Switch id="comments" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="mentions">Mentions and replies</Label>
                              <p className="text-sm text-muted-foreground">
                                When someone mentions or replies to you
                              </p>
                            </div>
                            <Switch id="mentions" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset to defaults</Button>
                    <Button className="bg-learntube-red hover:bg-learntube-dark-red">Save preferences</Button>
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
