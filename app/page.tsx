'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import { useState, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          to_email: 'gajendraiitkgp@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );
      
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset form status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      
      // Reset error status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const skills = {
    'Programming Languages': ['Python', 'SQL', 'Cosmos Scope'],
    'Machine Learning & AI': ['Machine Learning', 'Deep Learning', 'NLP', 'Time Series Analysis', 'Statistical Analysis', 'GenAI'],
    'ML/DL Frameworks': ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'Keras', 'NLTK', 'Spacy'],
    'Data Science & Analytics': ['Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn', 'Plotly', 'EDA', 'Feature Engineering', 'Statistical Modeling'],
    'Cloud & DevOps': ['Azure ML', 'Azure Data Factory', 'Azure DevOps', 'Docker', 'Git', 'CI/CD', 'Microsoft Fabric'],
    'Visualization Tools': ['Power BI', 'Tableau', 'QGIS', 'Streamlit'],
    'Development Tools': ['Git', 'Flask', 'FastAPI'],
    'Core Competencies': ['Statistics', 'Data Structures & Algorithms', 'OOPS', 'Project Management', 'Research & Development']
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section id="home" className="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16"
          >
            {/* Text Content */}
            <div className="flex-1 text-left">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                Hi, I'm Gajendra Singh
                <span className="block text-blue-600 dark:text-blue-400">Data Scientist at Affine</span>
              </h1>
              <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
                Passionate about AI, Machine Learning, Deep Learning, NLP, and GenAI.
                Transforming data into actionable insights and building intelligent solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#projects"
                  className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  View Projects
                </Link>
                <Link 
                  href="#contact"
                  className="px-8 py-3 text-lg font-medium text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  Contact Me
                </Link>
                <a 
                  href={process.env.NODE_ENV === 'production' ? '/Gajendra/resume.pdf' : '/resume.pdf'}
                  download
                  className="px-8 py-3 text-lg font-medium text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 dark:text-green-400 dark:border-green-400 dark:hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Download Resume
                </a>
              </div>
            </div>

            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0"
            >
              <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 blur-2xl transform scale-110"></div>
              <div className="relative w-full h-full rounded-full border-4 border-blue-600 overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105">
                <Image
                  src={`${process.env.NODE_ENV === 'production' ? '/Gajendra' : ''}/images/profile.jpeg?v=${new Date().getTime()}`}
                  alt="Gajendra Singh - Data Scientist"
                  width={320}
                  height={320}
                  style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
                  priority
                  className="rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x400.png?text=GS';
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <Section id="about" title="About Me">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                As a Data Scientist at Affine, I specialize in developing and implementing advanced analytics solutions
                that drive business value. With expertise in machine learning, deep learning, and natural language processing,
                I help organizations transform their data into actionable insights.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                My passion lies in exploring cutting-edge AI technologies and applying them to solve real-world problems.
                I have a strong foundation in statistical analysis and a proven track record of delivering impactful
                data science projects.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Key Highlights</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Expertise in AI, ML, and Deep Learning</li>
                <li>Strong background in statistical analysis</li>
                <li>Experience with large-scale data processing</li>
                <li>Proficient in data visualization and storytelling</li>
                <li>Track record of successful project delivery</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" title="Skills & Expertise" className="bg-gray-50 dark:bg-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Featured Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Bus Arrival Time Prediction Model for Urban Traffic
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Developed temporal models with Random Forest Regressor achieving 22.83% MAPE, and designed a Multi-Input Multi-Output LSTM model achieving 18.68% MAPE by capturing spatial-temporal dependencies.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Python
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Deep Learning
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    LSTM
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Random Forest
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Acoustic-Driven Airflow Flame Extinguishing System
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Developed high-accuracy machine learning models for fire extinguishment prediction, incorporating explainable AI techniques for feature interpretation.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Python
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Deep Learning
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    XAI
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    CNN
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  CardioKernal: Heart Disease Prediction
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Created a custom SVM model for heart disease prediction with optimized kernel methods, achieving accuracies of 80% (Linear), 83% (Polynomial), and 91% (RBF) through careful hyperparameter tuning.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Python
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    SVM
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Machine Learning
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Healthcare
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  StreamForecaster: Stock Trend Analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Developed an LSTM model for accurate stock trend predictions with RSME value of 2.23 (14.19%), integrated with an interactive Streamlit web app for real-time analysis.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Python
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    LSTM
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Streamlit
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Finance
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  ChurnSense: Telecom Churn Prediction
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Built a comprehensive churn prediction system with PowerBI dashboards, SMOTEENN for imbalanced data, and Flask deployment, achieving 93% accuracy with Decision Tree and 80% with Random Forest.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Python
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    PowerBI
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Flask
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    ML
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  PM2.5 Prediction using Spatiotemporal Graph Neural Networks
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Developed advanced deep learning models for precise air pollution prediction in Delhi, combining spatial and temporal analysis with outstanding performance metrics.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Python
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Deep Learning
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    QGIS
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Time Series
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Marketplace Ads Performance in Search Engines
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Optimized ad performance through experimentation and automated data pipelines, providing actionable insights through Power BI dashboards.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Azure DevOps
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    SQL
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Power BI
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    ETL
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Player Segmentation for PlayStation Marketing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Advanced player segmentation analysis using 27 KPIs, implementing K-Means clustering to identify six distinct player segments for targeted marketing.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Python
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Machine Learning
                  </span>
                  <span className="px-2 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    Data Analysis
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Experience Section */}
        <Section id="experience" title="Professional Experience" className="bg-gray-50 dark:bg-gray-800">
          <div className="space-y-8">
            {/* Affine Experience */}
            <div className="relative pl-8 border-l-2 border-blue-600 dark:border-blue-400">
              <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[9px] top-0"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Data Scientist
              </h3>
              <p className="text-blue-600 dark:text-blue-400">Affine • May 2024 - Present</p>
              <div className="mt-4 space-y-6">
                {/* Project 1 */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Marketplace Ads Performance in Search Engines</h4>
                  <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Conducted experiments for treatments and controls using Agora and FSC to evaluate ad performance</li>
                    <li>Optimized SQL and Cosmos scripts, automating deployments via Azure DevOps</li>
                    <li>Built and managed ETL pipelines in Azure Data Factory using Microsoft Fabric</li>
                    <li>Developed Power BI dashboards to track KPIs, analyze experiments, and monitor forecasting models</li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Player Segmentation and Behavioral Insights for PlayStation</h4>
                  <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Conducted player segmentation using 27 KPIs with bias correction and data standardization</li>
                    <li>Determined optimal clusters using multiple methods and grouped players into six distinct segments</li>
                    <li>Analyzed clusters to derive actionable insights for targeted marketing strategies</li>
                  </ul>
                </div>

                {/* Project 3 */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">First Time User Experience Analysis - Call of Duty: Warzone Mobile</h4>
                  <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Created KPIs using SQL and performed comprehensive data analysis with Python</li>
                    <li>Built Tableau dashboards to analyze Install Funnel and FTUE Funnel</li>
                    <li>Provided actionable insights on user behavior and product performance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* MFSDSAI Experience */}
            <div className="relative pl-8 border-l-2 border-blue-600 dark:border-blue-400">
              <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[9px] top-0"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Deep Learning Researcher
              </h3>
              <p className="text-blue-600 dark:text-blue-400">MFSDSAI, IIT Roorkee • May 2023 - July 2023</p>
              <div className="mt-4 space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">PM2.5 Prediction using Spatiotemporal Graph Neural Networks</h4>
                  <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Built a Spatiotemporal Model to predict air pollution levels across road segments in Delhi, accounting for variations in both location and time</li>
                    <li>Performed data preprocessing, feature engineering, EDA, and data visualization. Utilized QGIS for spatial analysis, enhancing data insights</li>
                    <li>Created Time Series Models (ARIMA, VAR, VARMAX) for temporal analysis and PM2.5 predictions. VARMAX outperforms others with an RMSE of 29.033</li>
                    <li>Designed STGNN and STGCNN Graph Deep Learning models for precise next-hour PM2.5 level prediction, integrating spatial and temporal aspects</li>
                    <li>Demonstrated outstanding model performance with an average MSE of 19.0432 for STGNN and 12.3012 for STGCNN, validated on the test dataset</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* IIT Kharagpur Experience */}
            <div className="relative pl-8 border-l-2 border-blue-600 dark:border-blue-400">
              <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[9px] top-0"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Machine Learning Researcher
              </h3>
              <p className="text-blue-600 dark:text-blue-400">COE-SEA, IIT Kharagpur • Dec 2022 - Jan 2023</p>
              <div className="mt-4 space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Acoustic-Driven Airflow Flame Extinguishing System</h4>
                  <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Built a model for predicting fire extinguishment from an Acoustic-Driven Airflow Flame Extinguishing System comprising ANN (95%) and CNN (97%)</li>
                    <li>Used SHAP and LIME with Explainable AI (XAI) techniques to identify impactful features through summary, dependence, and local explanation plots</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Education Section */}
        <Section id="education" title="Education">
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Master of Technology (M.Tech)
              </h3>
              <p className="text-blue-600 dark:text-blue-400">Indian Institute of Technology Kharagpur • 2024</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                CGPA: 8.90/10
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Bachelor of Technology (B.Tech)
              </h3>
              <p className="text-blue-600 dark:text-blue-400">Rajasthan Technical University • 2021</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Percentage: 74.33%
              </p>
            </div>
          </div>
        </Section>

        {/* Publications Section */}
        <Section id="publications" title="Publications & Presentations" className="bg-gray-50 dark:bg-gray-800">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Conference Presentations & Publications
              </h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Selected to present Master's Thesis at the INTERNATIONAL CONFERENCE ON URBAN AFFAIRS in New York City, USA.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Selected Presenter at the International Conference on Data Analytics for Business and Industry (ICDABI) (DATA'23).</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Published a paper, "Explainable AI-Driven Machine Learning Approach for Prediction of Acoustic-Based Fire Extinction" (2023) on IEEE Xplore.</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Awards & Achievements Section */}
        <Section id="awards" title="Awards & Achievements">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span>Secured All India Rank 135 in Graduate Aptitude test in Engineering (GATE) [ES] with Top 2 Percentile. [GATE 2022]</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span>Awarded a Scholarship (TFWS seat) for being an excellent academic student during my bachelor's degree.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span>Selected as one of the top 5 students in the "Tall Building Design" workshop conducted by IIT Roorkee.</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Extra Curricular Activities Section */}
        <Section id="activities" title="Extra Curricular Activities" className="bg-gray-50 dark:bg-gray-800">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Led two teams of 9 members each in AI project execution as Project Lead at SPARK4AI (AI Community, IITKGP).</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Served as Sub-Committee Facilitator of RCGSIDM [IIT Kharagpur], coordinating and managing all departmental needs.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Worked as Teaching Assistant for 97 UG students in the ED and Computer Graphics course (CE13003) at IIT Kharagpur.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Served as Core Committee Member of the Annual IBSR Conference of RCGSIDM department, IIT Kharagpur.</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Blog Section */}
        <Section id="blog" title="Technical Blog" className="bg-gray-50 dark:bg-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add blog post cards here */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Blog Post Title
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Brief preview of the blog post content.
                </p>
                <Link
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Get in Touch">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <p className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    gajendraiitkgp@gmail.com
                  </p>
                  <p className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 8279262589
                  </p>
                  <div className="flex space-x-4">
                    <Link 
                      href="https://github.com/Gajju4" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </Link>
                    <Link 
                      href="https://www.linkedin.com/in/gajendra-iitkgp" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      placeholder="Your name"
                      required
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      placeholder="your.email@example.com"
                      required
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      placeholder="What is this about?"
                      required
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      placeholder="Your message here..."
                      required
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                  
                  {formStatus === 'success' && (
                    <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  )}
                  
                  {formStatus === 'error' && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                      Failed to send message. Please try again later.
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full px-6 py-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 ${
                      formStatus === 'submitting'
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
} 