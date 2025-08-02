import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SearchBox } from "@/components/ui/search-box";
import { FilterChip } from "@/components/ui/filter-chip";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Star, 
  MapPin, 
  Users, 
  Clock, 
  Filter,
  SortAsc,
  Grid,
  List
} from "lucide-react";
import { mockCAs, domains, locations } from "@/data/mockData";

export default function BrowseCAs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [experienceRange, setExperienceRange] = useState([0]);
  const [minRating, setMinRating] = useState([0]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isLoading, setIsLoading] = useState(false);

  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    role: 'client' as const,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  };

  const filteredAndSortedCAs = useMemo(() => {
    let filtered = mockCAs.filter(ca => {
      const matchesSearch = ca.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ca.domains.some(domain => domain.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDomain = selectedDomain === "all" || ca.domains.includes(selectedDomain);
      const matchesLocation = selectedLocation === "all" || ca.location === selectedLocation;
      const matchesExperience = ca.experience >= experienceRange[0];
      const matchesRating = ca.rating >= minRating[0];

      return matchesSearch && matchesDomain && matchesLocation && matchesExperience && matchesRating;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return b.experience - a.experience;
        case "projects":
          return b.completedProjects - a.completedProjects;
        case "price-low":
          return a.pricing.hourlyRate - b.pricing.hourlyRate;
        case "price-high":
          return b.pricing.hourlyRate - a.pricing.hourlyRate;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedDomain, selectedLocation, experienceRange, minRating, sortBy]);

  const activeFilters = useMemo(() => {
    const filters = [];
    if (selectedDomain !== "all") filters.push({ label: "Domain", value: selectedDomain, key: "domain" });
    if (selectedLocation !== "all") filters.push({ label: "Location", value: selectedLocation, key: "location" });
    if (experienceRange[0] > 0) filters.push({ label: "Experience", value: `${experienceRange[0]}+ years`, key: "experience" });
    if (minRating[0] > 0) filters.push({ label: "Rating", value: `${minRating[0].toFixed(1)}+`, key: "rating" });
    return filters;
  }, [selectedDomain, selectedLocation, experienceRange, minRating]);

  const clearFilter = (key: string) => {
    switch (key) {
      case "domain":
        setSelectedDomain("all");
        break;
      case "location":
        setSelectedLocation("all");
        break;
      case "experience":
        setExperienceRange([0]);
        break;
      case "rating":
        setMinRating([0]);
        break;
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedDomain("all");
    setSelectedLocation("all");
    setExperienceRange([0]);
    setMinRating([0]);
  };

  return (
    <Layout user={mockUser}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Chartered Accountants</h1>
          <p className="text-muted-foreground">Find the perfect CA for your business needs</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-24">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Filters</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <SearchBox
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search by name or domain..."
                    suggestions={[...domains, ...mockCAs.map(ca => ca.name)]}
                  />
                </div>

                {/* Domain Filter */}
                <div className="space-y-2">
                  <Label>Domain Expertise</Label>
                  <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Domains</SelectItem>
                      {domains.map(domain => (
                        <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Filter */}
                <div className="space-y-2">
                  <Label>Minimum Experience: {experienceRange[0]} years</Label>
                  <Slider
                    value={experienceRange}
                    onValueChange={setExperienceRange}
                    max={20}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Rating Filter */}
                <div className="space-y-2">
                  <Label>Minimum Rating: {minRating[0].toFixed(1)}</Label>
                  <Slider
                    value={minRating}
                    onValueChange={setMinRating}
                    max={5}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearAllFilters}
                  disabled={activeFilters.length === 0 && !searchTerm}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* CA Cards */}
          <div className="flex-1">
            {/* Active Filters */}
            {(activeFilters.length > 0 || searchTerm) && (
              <div className="mb-4 animate-fade-in">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {searchTerm && (
                    <FilterChip
                      label="Search"
                      value={searchTerm}
                      onRemove={() => setSearchTerm("")}
                    />
                  )}
                  {activeFilters.map((filter) => (
                    <FilterChip
                      key={filter.key}
                      label={filter.label}
                      value={filter.value}
                      onRemove={() => clearFilter(filter.key)}
                    />
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                </div>
              </div>
            )}

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedCAs.length} CAs
                </p>
                <div className="flex items-center gap-1">
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="projects">Most Projects</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-full" />
                          <div className="flex gap-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-24" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "grid gap-6"}>
                {filteredAndSortedCAs.map((ca, index) => (
                  <Card 
                    key={ca.id} 
                    className="hover:shadow-medium transition-all duration-300 animate-fade-in hover:scale-[1.02] group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className={viewMode === "grid" ? "space-y-4" : "flex flex-col md:flex-row gap-6"}>
                        <div className="flex items-start gap-4">
                          <Avatar className={viewMode === "grid" ? "h-12 w-12" : "h-16 w-16"}>
                            <AvatarImage src={ca.avatar} alt={ca.name} />
                            <AvatarFallback>
                              {ca.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors ${viewMode === "grid" ? "text-lg" : "text-xl"}`}>
                                  {ca.name}
                                </h3>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {ca.location}
                                </div>
                              </div>
                              <Badge 
                                variant={ca.availability === 'available' ? 'default' : 'secondary'}
                                className={ca.availability === 'available' ? 'bg-success animate-pulse-glow' : ''}
                              >
                                {ca.availability}
                              </Badge>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{ca.description}</p>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {ca.domains.slice(0, viewMode === "grid" ? 2 : 3).map((domain) => (
                                <Badge key={domain} variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                                  {domain}
                                </Badge>
                              ))}
                              {ca.domains.length > (viewMode === "grid" ? 2 : 3) && (
                                <Badge variant="outline">+{ca.domains.length - (viewMode === "grid" ? 2 : 3)}</Badge>
                              )}
                            </div>

                            <div className={`flex items-center gap-4 text-sm text-muted-foreground ${viewMode === "grid" ? "flex-col items-start gap-2" : "gap-6"}`}>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                                {ca.rating} ({ca.reviewCount})
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {ca.completedProjects} projects
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {ca.experience} years
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={`flex flex-col gap-3 ${viewMode === "grid" ? "w-full" : "md:w-48"}`}>
                          <div className={viewMode === "grid" ? "text-left" : "text-right"}>
                            <div className="text-sm text-muted-foreground">Starting from</div>
                            <div className="text-lg font-bold text-primary">
                              ₹{ca.pricing.hourlyRate}/hour
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Consultation: ₹{ca.pricing.consultationFee}
                            </div>
                          </div>
                          
                          <div className={`flex gap-2 ${viewMode === "grid" ? "flex-row" : "flex-col"}`}>
                            <Button variant="gradient" size="sm" asChild className="hover:shadow-glow transition-all">
                              <Link to={`/client/ca/${ca.id}`}>
                                View Profile
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild className="hover:scale-105 transition-transform">
                              <Link to={`/client/hire/${ca.id}`}>
                                Hire Now
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredAndSortedCAs.length === 0 && !isLoading && (
              <Card className="text-center py-12 animate-fade-in">
                <CardContent>
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold mb-2">No CAs found</h3>
                  <p className="text-muted-foreground mb-4">
                    No chartered accountants match your current search criteria.
                  </p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear all filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}