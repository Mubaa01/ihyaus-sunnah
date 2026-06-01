import { Routes, Route } from 'react-router-dom'
import PublicLayout from './src/components/layout/PublicLayout'
import AdminLayout from './src/components/layout/AdminLayout'

// Public Pages
import HomePage from './src/pages/public/HomePage'
import AboutPage from './src/pages/public/AboutPage'
import ProgramsPage from './src/pages/public/ProgramsPage'
import ProgramDetailsPage from './src/pages/public/ProgramDetailsPage'
import StudentResearchPage from './src/pages/public/StudentResearchPage'
import MediaLibraryPage from './src/pages/public/MediaLibraryPage'
import StaffDirectoryPage from './src/pages/public/StaffDirectoryPage'
//import OrganizationPage from './src/pages/public/OrganizationPage'
import MajlisSchedulePage from './src/pages/public/MajlisSchedulePage'
import MajlisDetailsPage from './src/pages/public/MajlisDetailsPage'
import DonatePage from './src/pages/public/DonatePage'
import StaffDetailsPage from './src/pages/public/StaffDetailsPage'


// Admin Pages
import LoginPage from './src/pages/admin/LoginPage'
import StaffListPage from './src/pages/admin/StaffManagement/StaffListPage'
import StaffFormPage from './src/pages/admin/StaffManagement/StaffFormPage'
import ProgramListPage from './src/pages/admin/ProgramManagement/ProgramListPage'
import ProgramFormPage from './src/pages/admin/ProgramManagement/ProgramFormPage'
import MediaListPage from './src/pages/admin/MediaLibraryManagement/MediaListPage'
import MediaFormPage from './src/pages/admin/MediaLibraryManagement/MediaFormPage'
import PlaylistListPage from './src/pages/admin/MediaLibraryManagement/PlaylistListPage'
import PlaylistFormPage from './src/pages/admin/MediaLibraryManagement/PlaylistFormPage'
import MajlisManagementPage from './src/pages/admin/MajlisManagement/MajlisManagementPage'
import ActivitiesPage from './src/pages/admin/Activities/ActivitiesPage'
import NotificationsPage from './src/pages/admin/Notifications/NotificationsPage'
import SettingsPage from './src/pages/admin/Settings/SettingsPage'
import AdminProfilePage from './src/pages/admin/Profile/AdminProfilePage'
import ResearchListPage from './src/pages/admin/ResearchManagement/ResearchListPage'
import ResearchFormPage from './src/pages/admin/ResearchManagement/ResearchFormPage'
import DashboardHome from './src/pages/admin/Dashboard/DashboardHome'

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:slug" element={<ProgramDetailsPage />} />
        <Route path="/research" element={<StudentResearchPage />} />
        <Route path="/media-library" element={<MediaLibraryPage />} />
        <Route path="/media-library/audio/:trusteeId" element={<MediaLibraryPage />} />
        <Route path="/staff" element={<StaffDirectoryPage />} />
        {/* <Route path="/organization" element={<OrganizationPage />} /> */}
        <Route path="/lectures" element={<MajlisSchedulePage />} />
        <Route path="/lectures/:id" element={<MajlisDetailsPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/staff/:id" element={<StaffDetailsPage />} />
        <Route path="/staff/profile/:id" element={<StaffDetailsPage />} />

      </Route>

      {/* Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="staff" element={<StaffListPage />} />
        <Route path="staff/create" element={<StaffFormPage />} />
        <Route path="staff/view/:id" element={<StaffDetailsPage />} />
        <Route path="staff/:id" element={<StaffFormPage />} />
        <Route path="programs" element={<ProgramListPage />} />
        <Route path="programs/create" element={<ProgramFormPage />} />
        <Route path="programs/:id" element={<ProgramFormPage />} />
        <Route path="research" element={<ResearchListPage />} />
        <Route path="research/create" element={<ResearchFormPage />} />
        <Route path="research/:id" element={<ResearchFormPage />} />
        <Route path="media" element={<MediaListPage />} />
        <Route path="media/create" element={<MediaFormPage />} />
        <Route path="media/:id" element={<MediaFormPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="majlis" element={<MajlisManagementPage />} />
        <Route path="media/playlists" element={<PlaylistListPage />} />
        <Route path="media/playlists/create" element={<PlaylistFormPage />} />
        <Route path="media/playlists/:id" element={<PlaylistFormPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
