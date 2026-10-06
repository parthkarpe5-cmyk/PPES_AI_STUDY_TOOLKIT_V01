import { ClassLevel, BoardType } from '@/lib/study-profile';

export interface ChapterCurriculum {
  id: string;
  chapterNumber: number;
  name: string;
  topics: string[];
}

export interface SubjectCurriculum {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: ChapterCurriculum[];
}

// Built-in NCERT / CBSE curriculum for Class 8, 9, 10
const CBSE_CLASS_10: SubjectCurriculum[] = [
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: 'emerald',
    chapters: [
      {
        id: 'chemical-reactions',
        chapterNumber: 1,
        name: 'Chemical Reactions and Equations',
        topics: [
          'Balancing Chemical Equations',
          'Types of Chemical Reactions (Combination, Decomposition, Displacement)',
          'Oxidation and Reduction (Redox Reactions)',
          'Corrosion and Rancidity'
        ]
      },
      {
        id: 'acids-bases-salts',
        chapterNumber: 2,
        name: 'Acids, Bases and Salts',
        topics: [
          'Chemical Properties of Acids and Bases',
          'pH Scale and Its Daily Life Importance',
          'Bleaching Powder, Baking Soda, Washing Soda, Plaster of Paris',
          'Water of Crystallization'
        ]
      },
      {
        id: 'metals-non-metals',
        chapterNumber: 3,
        name: 'Metals and Non-metals',
        topics: [
          'Physical and Chemical Properties of Metals',
          'Reactivity Series and Extraction of Metals',
          'Ionic Bonds and Properties of Ionic Compounds',
          'Prevention of Corrosion and Alloys'
        ]
      },
      {
        id: 'carbon-compounds',
        chapterNumber: 4,
        name: 'Carbon and Its Compounds',
        topics: [
          'Covalent Bonding in Carbon Compounds',
          'Versatile Nature of Carbon (Catenation & Tetravalency)',
          'Homologous Series and IUPAC Nomenclature',
          'Chemical Properties: Combustion, Oxidation, Addition, Substitution',
          'Ethanol and Ethanoic Acid, Soaps and Detergents'
        ]
      },
      {
        id: 'life-processes',
        chapterNumber: 5,
        name: 'Life Processes',
        topics: [
          'Autotrophic and Heterotrophic Nutrition (Photosynthesis & Digestion)',
          'Respiration (Aerobic vs Anaerobic)',
          'Transportation in Human Beings (Heart, Blood Vessels, Lymph)',
          'Transportation in Plants (Xylem and Phloem)',
          'Excretion in Humans (Nephron Structure & Function)'
        ]
      },
      {
        id: 'control-coordination',
        chapterNumber: 6,
        name: 'Control and Coordination',
        topics: [
          'Nervous System, Neuron Structure, Reflex Arc',
          'Human Brain (Forebrain, Midbrain, Hindbrain)',
          'Plant Hormones and Tropic Movements',
          'Endocrine Glands and Hormones in Animals'
        ]
      },
      {
        id: 'how-organisms-reproduce',
        chapterNumber: 7,
        name: 'How do Organisms Reproduce?',
        topics: [
          'Asexual Reproduction (Binary Fission, Budding, Spore Formation)',
          'Sexual Reproduction in Flowering Plants (Pollination & Fertilization)',
          'Human Reproductive System (Male & Female)',
          'Menstrual Cycle and Reproductive Health'
        ]
      },
      {
        id: 'heredity',
        chapterNumber: 8,
        name: 'Heredity and Evolution',
        topics: [
          'Mendel’s Experiments (Monohybrid & Dihybrid Cross)',
          'Sex Determination in Humans',
          'Inherited vs Acquired Traits'
        ]
      },
      {
        id: 'light-reflection-refraction',
        chapterNumber: 9,
        name: 'Light: Reflection and Refraction',
        topics: [
          'Reflection by Spherical Mirrors (Concave & Convex Ray Diagrams)',
          'Mirror Formula and Magnification Numericals',
          'Refraction, Snell’s Law, Refractive Index',
          'Refraction by Spherical Lenses and Lens Formula',
          'Power of a Lens'
        ]
      },
      {
        id: 'human-eye',
        chapterNumber: 10,
        name: 'The Human Eye and the Colourful World',
        topics: [
          'Structure of Human Eye and Power of Accommodation',
          'Defects of Vision (Myopia, Hypermetropia, Presbyopia)',
          'Refraction through a Glass Prism and Dispersion',
          'Atmospheric Refraction (Twinkling of Stars, Advance Sunrise)',
          'Scattering of Light and Tyndall Effect (Blue Sky, Red Sunset)'
        ]
      },
      {
        id: 'electricity',
        chapterNumber: 11,
        name: 'Electricity',
        topics: [
          'Electric Current, Potential Difference and Ohm’s Law',
          'Resistance and Factors on which Resistance Depends (Resistivity)',
          'Resistors in Series and Parallel Combinations',
          'Heating Effect of Electric Current (Joule’s Law)',
          'Electric Power and Commercial Unit of Energy (kWh)'
        ]
      },
      {
        id: 'magnetic-effects',
        chapterNumber: 12,
        name: 'Magnetic Effects of Electric Current',
        topics: [
          'Magnetic Field and Field Lines around Straight Conductor and Solenoid',
          'Right-Hand Thumb Rule and Fleming’s Left-Hand Rule',
          'Force on a Current-Carrying Conductor in a Magnetic Field',
          'Electromagnetic Induction and Domestic Electric Circuits (Earthing, Fuse)'
        ]
      },
      {
        id: 'our-environment',
        chapterNumber: 13,
        name: 'Our Environment',
        topics: [
          'Ecosystem Components (Food Chains and Food Webs)',
          '10% Law of Energy Transfer and Biological Magnification',
          'Ozone Layer Depletion and Waste Management'
        ]
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: 'blue',
    chapters: [
      {
        id: 'real-numbers',
        chapterNumber: 1,
        name: 'Real Numbers',
        topics: [
          'Fundamental Theorem of Arithmetic',
          'Revisiting Irrational Numbers (Proof of √2, √3, √5)',
          'HCF and LCM Applications'
        ]
      },
      {
        id: 'polynomials',
        chapterNumber: 2,
        name: 'Polynomials',
        topics: [
          'Geometrical Meaning of Zeroes of a Polynomial',
          'Relationship between Zeroes and Coefficients of Quadratic Polynomials',
          'Forming a Quadratic Polynomial given Sum and Product of Zeroes'
        ]
      },
      {
        id: 'pair-of-linear-equations',
        chapterNumber: 3,
        name: 'Pair of Linear Equations in Two Variables',
        topics: [
          'Graphical Method of Solution and Consistency Conditions',
          'Substitution Method',
          'Elimination Method',
          'Word Problems (Speed-Distance, Age, Fractions, Work)'
        ]
      },
      {
        id: 'quadratic-equations',
        chapterNumber: 4,
        name: 'Quadratic Equations',
        topics: [
          'Standard Form of a Quadratic Equation',
          'Solution by Factorisation',
          'Quadratic Formula and Discriminant (Nature of Roots)',
          'Word Problems leading to Quadratic Equations'
        ]
      },
      {
        id: 'arithmetic-progressions',
        chapterNumber: 5,
        name: 'Arithmetic Progressions',
        topics: [
          'nth Term of an AP (an = a + (n-1)d)',
          'Sum of First n Terms of an AP (Sn = n/2[2a + (n-1)d])',
          'Daily Life Word Problems based on AP'
        ]
      },
      {
        id: 'triangles',
        chapterNumber: 6,
        name: 'Triangles',
        topics: [
          'Basic Proportionality Theorem (Thales Theorem) and Converse',
          'Criteria for Similarity of Triangles (AAA, SSS, SAS)',
          'Proof and Applications of Similarity'
        ]
      },
      {
        id: 'coordinate-geometry',
        chapterNumber: 7,
        name: 'Coordinate Geometry',
        topics: [
          'Distance Formula',
          'Section Formula and Midpoint Formula',
          'Applications to Geometrical Shapes'
        ]
      },
      {
        id: 'introduction-to-trigonometry',
        chapterNumber: 8,
        name: 'Introduction to Trigonometry',
        topics: [
          'Trigonometric Ratios of an Acute Angle',
          'Trigonometric Ratios of Specific Angles (0°, 30°, 45°, 60°, 90°)',
          'Fundamental Trigonometric Identities (sin²θ + cos²θ = 1, etc.)'
        ]
      },
      {
        id: 'applications-of-trigonometry',
        chapterNumber: 9,
        name: 'Some Applications of Trigonometry',
        topics: [
          'Angles of Elevation and Depression',
          'Heights and Distances Word Problems (Single and Two-Object Scenarios)'
        ]
      },
      {
        id: 'circles',
        chapterNumber: 10,
        name: 'Circles',
        topics: [
          'Tangent to a Circle at a Point',
          'Theorem: Tangent is perpendicular to radius through point of contact',
          'Theorem: Lengths of tangents drawn from an external point are equal'
        ]
      },
      {
        id: 'areas-related-to-circles',
        chapterNumber: 11,
        name: 'Areas Related to Circles',
        topics: [
          'Area of Sector and Segment of a Circle',
          'Length of an Arc of a Sector',
          'Problems on Combined Plane Figures'
        ]
      },
      {
        id: 'surface-areas-volumes',
        chapterNumber: 12,
        name: 'Surface Areas and Volumes',
        topics: [
          'Surface Area of Combinations of Solids (Cylinder, Cone, Sphere, Hemisphere)',
          'Volume of Combinations of Solids',
          'Conversion of Solid from One Shape to Another'
        ]
      },
      {
        id: 'statistics',
        chapterNumber: 13,
        name: 'Statistics',
        topics: [
          'Mean of Grouped Data (Direct Method, Assumed Mean Method)',
          'Mode of Grouped Data',
          'Median of Grouped Data and Empirical Formula'
        ]
      },
      {
        id: 'probability',
        chapterNumber: 14,
        name: 'Probability',
        topics: [
          'Classical Definition of Probability',
          'Elementary Events and Complementary Events',
          'Card Problems, Dice Problems, Coin Problems'
        ]
      }
    ]
  },
  {
    id: 'social-science',
    name: 'Social Science',
    icon: '🌍',
    color: 'amber',
    chapters: [
      {
        id: 'nationalism-in-europe',
        chapterNumber: 1,
        name: 'The Rise of Nationalism in Europe',
        topics: [
          'The French Revolution and the Idea of the Nation',
          'The Making of Nationalism in Europe and Liberal Nationalism',
          'The Age of Revolutions: 1830–1848',
          'Unification of Germany and Italy',
          'Visualizing the Nation (Allegories) and Balkan Crisis'
        ]
      },
      {
        id: 'nationalism-in-india',
        chapterNumber: 2,
        name: 'Nationalism in India',
        topics: [
          'First World War, Khilafat and Non-Cooperation Movement',
          'Differing Strands within the Movement (Towns, Countryside, Tribal)',
          'Towards Civil Disobedience (Salt March and Dandi)',
          'The Sense of Collective Belonging'
        ]
      },
      {
        id: 'making-global-world',
        chapterNumber: 3,
        name: 'The Making of a Global World',
        topics: [
          'The Pre-modern World (Silk Routes, Food Travels)',
          'The Nineteenth Century (1815–1914) Global Economy',
          'The Great Depression of 1929'
        ]
      },
      {
        id: 'resources-and-development',
        chapterNumber: 4,
        name: 'Resources and Development',
        topics: [
          'Types and Planning of Resources in India',
          'Land Resources and Land Use Pattern',
          'Soil Erosion and Conservation Methods'
        ]
      },
      {
        id: 'agriculture',
        chapterNumber: 5,
        name: 'Agriculture',
        topics: [
          'Types of Farming (Primitive, Intensive, Commercial)',
          'Major Crops (Rice, Wheat, Millets, Pulses, Tea, Coffee)',
          'Institutional and Technological Reforms'
        ]
      },
      {
        id: 'power-sharing',
        chapterNumber: 6,
        name: 'Power Sharing',
        topics: [
          'Case Studies: Belgium and Sri Lanka',
          'Majoritarianism vs Accommodation',
          'Forms of Power Sharing (Horizontal, Vertical, Social Groups)'
        ]
      },
      {
        id: 'federalism',
        chapterNumber: 7,
        name: 'Federalism',
        topics: [
          'Key Features of Federalism',
          'What makes India a Federal Country? (Three Lists)',
          'Decentralization in India (Panchayati Raj & Municipalities)'
        ]
      },
      {
        id: 'sectors-indian-economy',
        chapterNumber: 8,
        name: 'Sectors of the Indian Economy',
        topics: [
          'Primary, Secondary, and Tertiary Sectors',
          'Rising Importance of the Tertiary Sector',
          'Organised vs Unorganised Sectors and MGNREGA'
        ]
      },
      {
        id: 'money-and-credit',
        chapterNumber: 9,
        name: 'Money and Credit',
        topics: [
          'Money as a Medium of Exchange and Double Coincidence of Wants',
          'Modern Forms of Money (Currency and Deposits)',
          'Formal vs Informal Sources of Credit in India and SHGs'
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    icon: '📖',
    color: 'purple',
    chapters: [
      {
        id: 'analytical-paragraph',
        chapterNumber: 1,
        name: 'Analytical Paragraph Writing',
        topics: [
          'Interpreting Bar Graphs, Pie Charts and Tables',
          'Comparative Vocabulary (Surge, Stagnate, Plunge)',
          'Writing Cohesive Introductory, Body and Concluding Sentences'
        ]
      },
      {
        id: 'formal-letter',
        chapterNumber: 2,
        name: 'Formal Letter Writing',
        topics: [
          'Letter to the Editor on Civic and Social Issues',
          'Letter of Complaint regarding Services and Goods',
          'Letter of Inquiry and Placing Orders',
          'Format, Salutation, Subject Line, and Tone'
        ]
      },
      {
        id: 'grammar-editing',
        chapterNumber: 3,
        name: 'Applied Grammar & Editing',
        topics: [
          'Tenses and Modals Editing and Omission Exercises',
          'Subject-Verb Concord Rules and Common Errors',
          'Reported Speech: Statements, Questions, Commands and Requests',
          'Determiners and Prepositions'
        ]
      },
      {
        id: 'first-flight-prose',
        chapterNumber: 4,
        name: 'Literature: Themes & Character Analysis',
        topics: [
          'A Letter to God (Lencho’s Faith vs Irony)',
          'Nelson Mandela: Long Walk to Freedom (Courage and Human Spirit)',
          'From the Diary of Anne Frank (Solitude and Adolescence)',
          'Madam Rides the Bus (Curiosity and Reality of Death)',
          'The Sermon at Benares (Kisa Gotami and Impermanence)'
        ]
      }
    ]
  },
  {
    id: 'computer-science',
    name: 'Computer Science / IT',
    icon: '💻',
    color: 'indigo',
    chapters: [
      {
        id: 'python-basics',
        chapterNumber: 1,
        name: 'Python Programming Basics',
        topics: [
          'Variables, Data Types (int, float, str, bool), and Operators',
          'Conditional Statements (if, elif, else)',
          'Looping Constructs (for and while loops with range())',
          'Lists and Strings Basics'
        ]
      },
      {
        id: 'cyber-safety',
        chapterNumber: 2,
        name: 'Cyber Ethics and Digital Safety',
        topics: [
          'Netiquettes and Safe Browsing Habits',
          'Cyberbullying, Phishing and Identity Theft Prevention',
          'Intellectual Property Rights and Open Source Software'
        ]
      },
      {
        id: 'html-web-design',
        chapterNumber: 3,
        name: 'HTML & CSS Fundamentals',
        topics: [
          'Basic Structure of HTML Documents',
          'Tags for Text, Lists (Ordered/Unordered), and Links',
          'Inserting Images and Creating Tables',
          'Inline and Internal CSS Styling'
        ]
      }
    ]
  }
];

// Class 9 Curriculum
const CBSE_CLASS_9: SubjectCurriculum[] = [
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: 'emerald',
    chapters: [
      {
        id: 'matter-in-surroundings',
        chapterNumber: 1,
        name: 'Matter in Our Surroundings',
        topics: ['States of Matter', 'Evaporation and Factors Affecting It', 'Latent Heat']
      },
      {
        id: 'is-matter-pure',
        chapterNumber: 2,
        name: 'Is Matter Around Us Pure?',
        topics: ['Mixtures vs Compounds', 'Solutions, Colloids, Suspensions', 'Separation Techniques']
      },
      {
        id: 'atoms-and-molecules',
        chapterNumber: 3,
        name: 'Atoms and Molecules',
        topics: ['Laws of Chemical Combination', 'Dalton’s Atomic Theory', 'Writing Chemical Formulae and Mole Concept']
      },
      {
        id: 'structure-of-atom',
        chapterNumber: 4,
        name: 'Structure of the Atom',
        topics: ['Thomson, Rutherford, and Bohr Models', 'Valency and Atomic Number', 'Isotopes and Isobars']
      },
      {
        id: 'fundamental-unit-of-life',
        chapterNumber: 5,
        name: 'The Fundamental Unit of Life (Cell)',
        topics: ['Plant vs Animal Cell Structure', 'Plasma Membrane, Nucleus, Cytoplasm', 'Cell Organelles: Mitochondria, Plastids, Endoplasmic Reticulum']
      },
      {
        id: 'tissues',
        chapterNumber: 6,
        name: 'Tissues',
        topics: ['Meristematic vs Permanent Plant Tissues', 'Xylem and Phloem', 'Animal Tissues (Epithelial, Connective, Muscular, Nervous)']
      },
      {
        id: 'motion',
        chapterNumber: 7,
        name: 'Motion',
        topics: ['Distance vs Displacement, Speed vs Velocity', 'Uniform and Non-Uniform Motion', 'Equations of Motion (v = u + at, etc.) Numericals', 'Uniform Circular Motion']
      },
      {
        id: 'force-and-laws-of-motion',
        chapterNumber: 8,
        name: 'Force and Laws of Motion',
        topics: ['Newton’s First, Second and Third Laws of Motion', 'Momentum and Inertia', 'Conservation of Momentum Numericals']
      },
      {
        id: 'gravitation',
        chapterNumber: 9,
        name: 'Gravitation',
        topics: ['Universal Law of Gravitation', 'Acceleration due to Gravity (g vs G)', 'Mass vs Weight', 'Thrust, Pressure, and Archimedes’ Principle']
      },
      {
        id: 'work-and-energy',
        chapterNumber: 10,
        name: 'Work and Energy',
        topics: ['Work Done by a Constant Force', 'Kinetic Energy and Potential Energy Derivations', 'Law of Conservation of Energy and Power']
      },
      {
        id: 'sound',
        chapterNumber: 11,
        name: 'Sound',
        topics: ['Production and Propagation of Sound', 'Longitudinal vs Transverse Waves', 'Speed of Sound, Echo and Reverberation', 'Structure of Human Ear']
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: 'blue',
    chapters: [
      {
        id: 'number-systems',
        chapterNumber: 1,
        name: 'Number Systems',
        topics: ['Irrational Numbers Representation on Number Line', 'Rationalisation of Denominators', 'Laws of Exponents for Real Numbers']
      },
      {
        id: 'polynomials',
        chapterNumber: 2,
        name: 'Polynomials',
        topics: ['Zeroes of a Polynomial', 'Remainder Theorem and Factor Theorem', 'Algebraic Identities and Factorisation']
      },
      {
        id: 'coordinate-geometry',
        chapterNumber: 3,
        name: 'Coordinate Geometry',
        topics: ['Cartesian Plane, Coordinates of a Point, Quadrants']
      },
      {
        id: 'linear-equations-two-variables',
        chapterNumber: 4,
        name: 'Linear Equations in Two Variables',
        topics: ['Standard Form ax + by + c = 0', 'Graph of a Linear Equation', 'Finding Solutions']
      },
      {
        id: 'lines-and-angles',
        chapterNumber: 5,
        name: 'Lines and Angles',
        topics: ['Intersecting and Non-Intersecting Lines', 'Pairs of Angles (Linear Pair, Vertically Opposite)', 'Transversal and Parallel Lines Theorems']
      },
      {
        id: 'triangles',
        chapterNumber: 6,
        name: 'Triangles',
        topics: ['Congruence of Triangles (SAS, ASA, AAS, SSS, RHS)', 'Inequalities in a Triangle']
      },
      {
        id: 'quadrilaterals',
        chapterNumber: 7,
        name: 'Quadrilaterals',
        topics: ['Angle Sum Property', 'Properties of a Parallelogram', 'Mid-point Theorem']
      },
      {
        id: 'circles',
        chapterNumber: 8,
        name: 'Circles',
        topics: ['Chords and Perpendiculars from Center', 'Angle Subtended by an Arc', 'Cyclic Quadrilaterals']
      },
      {
        id: 'herons-formula',
        chapterNumber: 9,
        name: 'Heron’s Formula',
        topics: ['Area of a Triangle using Heron’s Formula and Real-Life Applications']
      },
      {
        id: 'surface-areas-volumes',
        chapterNumber: 10,
        name: 'Surface Areas and Volumes',
        topics: ['Surface Area and Volume of Cubes, Cuboids, Cylinders, Cones, Spheres']
      },
      {
        id: 'statistics',
        chapterNumber: 11,
        name: 'Statistics',
        topics: ['Bar Graphs, Histograms of Varying Base Widths, Frequency Polygons']
      }
    ]
  },
  {
    id: 'social-science',
    name: 'Social Science',
    icon: '🌍',
    color: 'amber',
    chapters: [
      {
        id: 'french-revolution',
        chapterNumber: 1,
        name: 'The French Revolution',
        topics: ['French Society during Late 18th Century', 'Outbreak of Revolution and Reign of Terror', 'Abolition of Slavery and Legacy']
      },
      {
        id: 'socialism-in-europe',
        chapterNumber: 2,
        name: 'Socialism in Europe and the Russian Revolution',
        topics: ['Liberals, Radicals and Conservatives', 'The Russian Revolution of 1917', 'Stalinism and Collectivisation']
      },
      {
        id: 'india-size-location',
        chapterNumber: 3,
        name: 'India: Size and Location',
        topics: ['Location and Latitudinal/Longitudinal Extent', 'Standard Meridian of India', 'India and the World']
      },
      {
        id: 'physical-features-india',
        chapterNumber: 4,
        name: 'Physical Features of India',
        topics: ['The Himalayan Mountains', 'The Northern Plains and Peninsular Plateau', 'Coastal Plains and Islands']
      },
      {
        id: 'what-is-democracy',
        chapterNumber: 5,
        name: 'What is Democracy? Why Democracy?',
        topics: ['Features of Democracy', 'Arguments For and Against Democracy', 'Broader Meaning of Democracy']
      },
      {
        id: 'poverty-as-a-challenge',
        chapterNumber: 6,
        name: 'Poverty as a Challenge',
        topics: ['Two Typical Cases of Poverty', 'Poverty Line Determination', 'Anti-Poverty Measures and Future Challenges']
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    icon: '📖',
    color: 'purple',
    chapters: [
      {
        id: 'descriptive-paragraph',
        chapterNumber: 1,
        name: 'Descriptive Paragraph Writing',
        topics: ['Describing an Event, Situation or Person', 'Sensory Details and Coherence']
      },
      {
        id: 'diary-entry',
        chapterNumber: 2,
        name: 'Diary Entry & Story Writing',
        topics: ['Expressing Personal Emotions and Reflections', 'Plotting, Conflict, and Climax in Short Stories']
      },
      {
        id: 'grammar-tenses',
        chapterNumber: 3,
        name: 'Grammar: Concord & Modals',
        topics: ['Subject-Verb Concord in Complex Sentences', 'Modals of Obligation, Possibility and Permission', 'Reported Speech']
      }
    ]
  },
  {
    id: 'computer-science',
    name: 'Computer Science / IT',
    icon: '💻',
    color: 'indigo',
    chapters: [
      {
        id: 'algorithms-flowcharts',
        chapterNumber: 1,
        name: 'Computational Thinking & Flowcharts',
        topics: ['Problem Decomposition', 'Flowchart Symbols and Logic', 'Writing Step-by-Step Pseudocode']
      },
      {
        id: 'python-intro',
        chapterNumber: 2,
        name: 'Introduction to Python',
        topics: ['Interactive Mode vs Script Mode', 'Print statements, Input functions', 'Basic Arithmetic and Logic']
      }
    ]
  }
];

// Class 8 Curriculum
const CBSE_CLASS_8: SubjectCurriculum[] = [
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: 'emerald',
    chapters: [
      {
        id: 'crop-production',
        chapterNumber: 1,
        name: 'Crop Production and Management',
        topics: ['Agricultural Practices', 'Sowing, Manure and Fertilizers', 'Irrigation Methods', 'Harvesting and Storage']
      },
      {
        id: 'microorganisms',
        chapterNumber: 2,
        name: 'Microorganisms: Friend and Foe',
        topics: ['Classification of Microbes', 'Commercial and Medicinal Uses', 'Harmful Microorganisms and Food Preservation']
      },
      {
        id: 'coal-petroleum',
        chapterNumber: 3,
        name: 'Coal and Petroleum',
        topics: ['Fossil Fuels', 'Fractional Distillation of Petroleum', 'Natural Gas and Conservation']
      },
      {
        id: 'combustion-flame',
        chapterNumber: 4,
        name: 'Combustion and Flame',
        topics: ['Conditions for Combustion', 'Types of Combustion and Fire Control', 'Structure of a Flame and Fuel Efficiency']
      },
      {
        id: 'cell-structure',
        chapterNumber: 5,
        name: 'Cell — Structure and Functions',
        topics: ['Discovery and Cell Diversity', 'Parts of the Cell', 'Comparison of Plant and Animal Cells']
      },
      {
        id: 'force-pressure',
        chapterNumber: 6,
        name: 'Force and Pressure',
        topics: ['Contact vs Non-contact Forces', 'Pressure and Daily Life Applications', 'Atmospheric Pressure and Liquid Pressure']
      },
      {
        id: 'friction',
        chapterNumber: 7,
        name: 'Friction',
        topics: ['Factors Affecting Friction', 'Friction: A Necessary Evil', 'Increasing and Reducing Friction', 'Fluid Friction']
      },
      {
        id: 'sound',
        chapterNumber: 8,
        name: 'Sound',
        topics: ['Sound Produced by Vibrating Bodies', 'Propagation of Sound through Mediums', 'Audible and Inaudible Sounds', 'Noise Pollution']
      },
      {
        id: 'chemical-effects-current',
        chapterNumber: 9,
        name: 'Chemical Effects of Electric Current',
        topics: ['Conducting Liquids', 'Electroplating and Applications']
      },
      {
        id: 'light',
        chapterNumber: 10,
        name: 'Light',
        topics: ['Laws of Reflection', 'Regular and Diffused Reflection', 'Multiple Reflections and Kaleidoscope', 'Care of the Eyes']
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: 'blue',
    chapters: [
      {
        id: 'rational-numbers',
        chapterNumber: 1,
        name: 'Rational Numbers',
        topics: ['Properties of Rational Numbers (Closure, Commutativity, Associativity)', 'Representation on Number Line', 'Rational Numbers between Two Numbers']
      },
      {
        id: 'linear-equations-one-variable',
        chapterNumber: 2,
        name: 'Linear Equations in One Variable',
        topics: ['Solving Equations with Variables on One and Both Sides', 'Word Problems on Numbers, Ages and Currency']
      },
      {
        id: 'understanding-quadrilaterals',
        chapterNumber: 3,
        name: 'Understanding Quadrilaterals',
        topics: ['Polygons and Angle Sum Property', 'Types of Quadrilaterals (Trapezium, Parallelogram, Rhombus, Rectangle, Square)']
      },
      {
        id: 'squares-and-square-roots',
        chapterNumber: 4,
        name: 'Squares and Square Roots',
        topics: ['Properties of Square Numbers', 'Finding Square Roots by Prime Factorisation and Long Division Method']
      },
      {
        id: 'cubes-and-cube-roots',
        chapterNumber: 5,
        name: 'Cubes and Cube Roots',
        topics: ['Cube Numbers and Finding Cube Roots by Prime Factorisation']
      },
      {
        id: 'comparing-quantities',
        chapterNumber: 6,
        name: 'Comparing Quantities',
        topics: ['Ratio and Percentage', 'Profit, Loss, and Discount', 'Compound Interest Formula and Applications']
      },
      {
        id: 'algebraic-expressions',
        chapterNumber: 7,
        name: 'Algebraic Expressions and Identities',
        topics: ['Addition and Subtraction of Expressions', 'Multiplication of Monomials and Polynomials', 'Standard Identities']
      },
      {
        id: 'mensuration',
        chapterNumber: 8,
        name: 'Mensuration',
        topics: ['Area of Trapezium and General Quadrilateral', 'Surface Area and Volume of Cuboid, Cube and Cylinder']
      },
      {
        id: 'exponents-powers',
        chapterNumber: 9,
        name: 'Exponents and Powers',
        topics: ['Powers with Negative Exponents', 'Laws of Exponents', 'Expressing Small Numbers in Standard Scientific Form']
      },
      {
        id: 'direct-inverse-proportions',
        chapterNumber: 10,
        name: 'Direct and Inverse Proportions',
        topics: ['Direct Proportion Problems', 'Inverse Proportion Problems']
      },
      {
        id: 'factorisation',
        chapterNumber: 11,
        name: 'Factorisation',
        topics: ['Common Factor Method', 'Factorisation using Algebraic Identities', 'Division of Polynomials']
      }
    ]
  },
  {
    id: 'social-science',
    name: 'Social Science',
    icon: '🌍',
    color: 'amber',
    chapters: [
      {
        id: 'how-when-where',
        chapterNumber: 1,
        name: 'How, When and Where (History)',
        topics: ['How Important are Dates?', 'Periodisation in Indian History', 'Colonial Administration Records']
      },
      {
        id: 'from-trade-to-territory',
        chapterNumber: 2,
        name: 'From Trade to Territory',
        topics: ['East India Company Comes to the East', 'Battle of Plassey and Buxar', 'Doctrine of Lapse and Subsidiary Alliance']
      },
      {
        id: 'resources',
        chapterNumber: 3,
        name: 'Resources (Geography)',
        topics: ['Natural, Human-Made, and Human Resources', 'Conserving Resources and Sustainable Development']
      },
      {
        id: 'indian-constitution',
        chapterNumber: 4,
        name: 'The Indian Constitution (Civics)',
        topics: ['Why Does a Country Need a Constitution?', 'Key Features: Federalism, Separation of Powers, Fundamental Rights, Secularism']
      },
      {
        id: 'judiciary',
        chapterNumber: 5,
        name: 'Judiciary',
        topics: ['Role and Independence of the Judiciary', 'Structure of Courts in India (Supreme, High, Subordinate)', 'Public Interest Litigation (PIL)']
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    icon: '📖',
    color: 'purple',
    chapters: [
      {
        id: 'formal-informal-letters',
        chapterNumber: 1,
        name: 'Letter Writing',
        topics: ['Informal Letters to Family and Friends', 'Formal Leave Applications and Requests']
      },
      {
        id: 'notice-story-writing',
        chapterNumber: 2,
        name: 'Notice and Story Writing',
        topics: ['Drafting School Notices with Proper Format', 'Creating Stories with a Clear Beginning, Climax, and Moral']
      },
      {
        id: 'voice-speech',
        chapterNumber: 3,
        name: 'Grammar: Voice & Speech',
        topics: ['Active and Passive Voice Transformations', 'Direct and Indirect Speech Rules', 'Tenses in Everyday Writing']
      }
    ]
  },
  {
    id: 'computer-science',
    name: 'Computer Science / IT',
    icon: '💻',
    color: 'indigo',
    chapters: [
      {
        id: 'computer-hardware-logic',
        chapterNumber: 1,
        name: 'Computer Systems and Logic',
        topics: ['Input, Processing, Storage, and Output Devices', 'Binary Numbers and Logic Gates Overview']
      },
      {
        id: 'digital-citizenship',
        chapterNumber: 2,
        name: 'Safe Digital Habits',
        topics: ['Creating Strong Passwords', 'Recognizing Spam and Phishing', 'Respectful Online Communication']
      }
    ]
  }
];

export function getCurriculumSubjects(classLevel: ClassLevel, board: BoardType = 'cbse'): SubjectCurriculum[] {
  // Currently CBSE and general state boards share the core NCERT curriculum
  if (classLevel === '8') return CBSE_CLASS_8;
  if (classLevel === '9') return CBSE_CLASS_9;
  return CBSE_CLASS_10;
}

export function getSubjectById(classLevel: ClassLevel, subjectId: string, board: BoardType = 'cbse'): SubjectCurriculum | undefined {
  const subjects = getCurriculumSubjects(classLevel, board);
  return subjects.find((s) => s.id === subjectId);
}

export function getChapterById(classLevel: ClassLevel, subjectId: string, chapterId: string, board: BoardType = 'cbse'): ChapterCurriculum | undefined {
  const subject = getSubjectById(classLevel, subjectId, board);
  return subject?.chapters.find((c) => c.id === chapterId);
}
