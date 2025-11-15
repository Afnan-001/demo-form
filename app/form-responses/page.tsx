'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Briefcase,
  DollarSign,
  Award,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { FormData } from '@/types/form';

interface ResponseData extends FormData {
  _id: string;
  createdAt: string;
}

export default function FormResponsesPage() {
  const router = useRouter();
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [professionFilter, setProfessionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchResponses();
  }, []);

  useEffect(() => {
    filterAndSortResponses();
  }, [responses, searchTerm, countryFilter, professionFilter, sortBy]);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/responses');
      if (response.ok) {
        const data = await response.json();
        setResponses(data);
      } else {
        console.error('Failed to fetch responses');
      }
    } catch (error) {
      console.error('Error fetching responses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortResponses = () => {
    let filtered = [...responses];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(response => 
        response.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        response.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        response.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        response.phoneNumber?.includes(searchTerm)
      );
    }

    // Apply country filter
    if (countryFilter !== 'all') {
      filtered = filtered.filter(response => response.country === countryFilter);
    }

    // Apply profession filter
    if (professionFilter !== 'all') {
      filtered = filtered.filter(response => response.profession === professionFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        default:
          return 0;
      }
    });

    setFilteredResponses(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Country', 'Province', 'Work Authorization',
      'Profession', 'Position Type', 'Commission Based', 'Licensing', 'Submitted At'
    ];

    const csvData = filteredResponses.map(response => [
      `${response.firstName} ${response.lastName}`,
      response.email,
      `+${response.areaCode} ${response.phoneNumber}`,
      response.country,
      response.province,
      response.workAuth,
      response.profession,
      response.positionType,
      response.commissionBased,
      response.licensing,
      formatDate(response.createdAt)
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form-responses-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even if API call fails
      router.push('/login');
    }
  };

  const uniqueCountries = Array.from(new Set(responses.map(r => r.country))).filter(Boolean);
  const uniqueProfessions = Array.from(new Set(responses.map(r => r.profession))).filter(Boolean);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading responses...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Form Responses</h1>
            <p className="text-gray-600">
              Total responses: <span className="font-semibold">{responses.length}</span>
              {filteredResponses.length !== responses.length && (
                <span> | Filtered: <span className="font-semibold">{filteredResponses.length}</span></span>
              )}
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="country-filter">Country</Label>
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All countries</SelectItem>
                    {uniqueCountries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="profession-filter">Profession</Label>
                <Select value={professionFilter} onValueChange={setProfessionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All professions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All professions</SelectItem>
                    {uniqueProfessions.map(profession => (
                      <SelectItem key={profession} value={profession}>{profession}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sort">Sort by</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={fetchResponses} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Responses Grid */}
        {filteredResponses.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <User className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No responses found</h3>
              <p className="text-gray-600">
                {responses.length === 0 
                  ? "No form submissions yet." 
                  : "Try adjusting your filters to see more results."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResponses.map((response) => (
              <Card key={response._id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">
                      {response.firstName} {response.lastName}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(response.createdAt)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm truncate">{response.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">+{response.areaCode} {response.phoneNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{response.country}, {response.province}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{response.profession}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={response.workAuth === 'Yes' ? 'default' : 'secondary'}>
                        Work Auth: {response.workAuth}
                      </Badge>
                      <Badge variant={response.positionType === 'Full-time' ? 'default' : 'outline'}>
                        {response.positionType}
                      </Badge>
                      <Badge variant={response.commissionBased === 'Yes' ? 'default' : 'secondary'}>
                        <DollarSign className="h-3 w-3 mr-1" />
                        Commission: {response.commissionBased}
                      </Badge>
                      <Badge variant={response.licensing === 'Yes' ? 'default' : 'secondary'}>
                        <Award className="h-3 w-3 mr-1" />
                        Licensed: {response.licensing}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}