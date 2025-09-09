// Simple CV Display System
// Clean, straightforward approach for viewing and printing CV

// Configuration
const CONFIG = {
    ui: {
        buttonText: 'Download CV',
        printText: 'Print CV'
    }
};

// Simple CV functions
function downloadCV() {
    // Direct download of the existing PDF file
    const link = document.createElement('a');
    link.href = 'cv/Chames_eddine_Dhibi_CV_2025-09-09T14-16-47.pdf';
    link.download = 'Chames_eddine_Dhibi_CV.pdf';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function printCV() {
    window.print();
}

document.addEventListener('DOMContentLoaded', function() {
    // Add simple download button
    addSimpleDownloadButton();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            printCV();
        }
    });
});

function addSimpleDownloadButton() {
    // Create simple download button
    const downloadBtn = document.createElement('button');
    downloadBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        ${CONFIG.ui.buttonText}
    `;
    downloadBtn.className = 'download-cv-button';
    downloadBtn.setAttribute('aria-label', 'Download CV');
    downloadBtn.setAttribute('title', 'Download your CV as PDF');
    downloadBtn.onclick = () => {
        downloadCV();
    };
    
    // Simple styling
    downloadBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2d5a3d 0%, #1e3a2a 100%);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 12px rgba(45, 90, 61, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    // Hover effects
    downloadBtn.addEventListener('mouseenter', function() {
        this.style.background = '#1e3a2a';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 16px rgba(45, 90, 61, 0.4)';
    });
    
    downloadBtn.addEventListener('mouseleave', function() {
        this.style.background = '#2d5a3d';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(45, 90, 61, 0.3)';
    });
    
    // Add button to page
    document.body.appendChild(downloadBtn);
}

// Print styles for clean PDF output

// Enhanced print-specific styles for modern browsers
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        /* Hide all interactive elements */
        .download-pdf-button,
        .print-button,
        div[style*="position: fixed"],
        div[style*="backdrop-filter"] {
            display: none !important;
        }
        
        /* Reset page layout */
        body {
            margin: 0;
            padding: 0;
            background: white !important;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
        }
        
        /* Optimize CV container for printing */
        .cv-container {
            box-shadow: none !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
        }
        
        /* Ensure colors print correctly */
        .header,
        .section-title,
        .skill-tag, 
        .tech-tag, 
        .language-level,
        .skill-category,
        .project-item {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        
        /* Optimize spacing for print */
        .section {
            page-break-inside: avoid;
            margin-bottom: 0.8rem;
        }
        
        .experience-item,
        .project-item {
            page-break-inside: avoid;
        }
        
        /* Ensure proper font rendering */
        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Hide any animations during print */
        * {
            animation: none !important;
            transition: none !important;
        }
    }
    
    /* Modern CSS for better PDF generation */
    .cv-container {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }
    
    /* Ensure high-quality rendering */
    @media screen {
        .cv-container {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
        }
    }
`;
document.head.appendChild(printStyles);
