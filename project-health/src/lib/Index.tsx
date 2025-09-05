import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import HealthDashboard from '../components/HealthDashboard';
import DocumentUpload from '../components/DocumentUpload';
import FeaturesSection from '../components/FeaturesSection';
import MedicineReminder from '../components/MedicineReminder';
import HealthInsights from '../components/HealthInsights';
import EmergencyContacts from '../components/EmergencyContacts';
import DoctorPortal from '../components/DoctorPortal';
import FamilyProfiles from '../components/FamilyProfiles';
import CameraCapture from '../components/CameraCapture';
import HealthTimeline from '../components/HealthTimeline';
import EmergencyQR from '../components/EmergencyQR';
import AIHealthAssistant from '../components/AIHealthAssistant';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HealthDashboard />
        <FamilyProfiles />
        <DocumentUpload />
        <CameraCapture />
        <HealthTimeline />
        <MedicineReminder />
        <HealthInsights />
        <EmergencyContacts />
        <EmergencyQR />
        <AIHealthAssistant />
        <DoctorPortal />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
