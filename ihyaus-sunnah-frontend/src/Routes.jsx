import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import AdminLayout from './components/layout/AdminLayout'

// Public Pages
import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import ProgramsPage from './pages/public/ProgramsPage'
import ProgramDetailsPage from './pages/public/ProgramDetailsPage'
import StudentResearchPage from './pages/public/StudentResearchPage'
import MediaLibraryPage from './pages/public/MediaLibraryPage'
import StaffDirectoryPage from './pages/public/StaffDirectoryPage'
import MajlisSchedulePage from './pages/public/MajlisSchedulePage'
import MajlisDetailsPage from './pages/public/MajlisDetailsPage'
import DonatePage from './pages/public/DonatePage'
import StaffDetailsPage from './pages/public/StaffDetailsPage'

// Admin Pages
import LoginPage from './pages/admin/LoginPage'
import StaffListPage from './pages/admin/StaffManagement/StaffListPage'
import StaffFormPage from './pages/admin/StaffManagement/StaffFormPage'
import ProgramListPage from './pages/admin/ProgramManagement/ProgramListPage'
import ProgramFormPage from './pages/admin/ProgramManagement/ProgramFormPage'
import MediaListPage from './pages/admin/MediaLibraryManagement/MediaListPage'
import MediaFormPage from './pages/admin/MediaLibraryManagement/MediaFormPage'
import PlaylistListPage from './pages/admin/MediaLibraryManagement/PlaylistListPage'
import PlaylistFormPage from './pages/admin/MediaLibraryManagement/PlaylistFormPage'
import MajlisManagementPage from './pages/admin/MajlisManagement/MajlisManagementPage'
import ActivitiesPage from './pages/admin/Activities/ActivitiesPage'
import NotificationsPage from './pages/admin/Notifications/NotificationsPage'
import SettingsPage from './pages/admin/Settings/SettingsPage'
import AdminProfilePage from './pages/admin/Profile/AdminProfilePage'
import ResearchListPage from './pages/admin/ResearchManagement/ResearchListPage'
import ResearchFormPage from './pages/admin/ResearchManagement/ResearchFormPage'
import DashboardHome from './pages/admin/Dashboard/DashboardHome'
import PrivateRoute from './components/common/PrivateRoute'

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
        <Route path="/lectures" element={<MajlisSchedulePage />} />
        <Route path="/lectures/:id" element={<MajlisDetailsPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/staff/:id" element={<StaffDetailsPage />} />
        <Route path="/staff/profile/:id" element={<StaffDetailsPage />} />
      </Route>

      {/* Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route element={<PrivateRoute />}>
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
      </Route>
    </Routes>
  )
}

export default AppRoutes
