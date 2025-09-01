// CV PDF Generation Helper
// This script helps users easily convert the CV to PDF

document.addEventListener('DOMContentLoaded', function() {
    // Add print button to the CV
    addPrintButton();
    
    // Add keyboard shortcut (Ctrl+P or Cmd+P)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            printCV();
        }
    });
});

function addPrintButton() {
    // Create print button
    const printBtn = document.createElement('button');
    printBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6,9 6,2 18,2 18,9"></polyline>
            <path d="M6,18H4a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2H20a2,2,0,0,1,2,2v5a2,2,0,0,1-2,2H18"></path>
            <polyline points="6,14 6,18 18,18 18,14"></polyline>
        </svg>
        Download PDF
    `;
    printBtn.className = 'print-button';
    printBtn.onclick = printCV;
    
    // Style the button
    printBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2d5a3d;
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
    printBtn.addEventListener('mouseenter', function() {
        this.style.background = '#1e3a2a';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 16px rgba(45, 90, 61, 0.4)';
    });
    
    printBtn.addEventListener('mouseleave', function() {
        this.style.background = '#2d5a3d';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(45, 90, 61, 0.3)';
    });
    
    // Add button to page
    document.body.appendChild(printBtn);
    
    // Add print instructions
    addPrintInstructions();
}

function addPrintInstructions() {
    const instructions = document.createElement('div');
    instructions.innerHTML = `
        <div style="
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 16px;
            max-width: 280px;
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            line-height: 1.5;
            color: #4a4a4a;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 999;
        ">
            <strong>💡 PDF Download Tips:</strong><br><br>
            • Click "Download PDF" button<br>
            • Or press <kbd>Ctrl+P</kbd> (Windows) / <kbd>Cmd+P</kbd> (Mac)<br>
            • Choose "Save as PDF" in destination<br>
            • Select "More settings" → "Background graphics" for colors<br>
            • <strong>✅ Guaranteed 1 page layout</strong><br>
            • Click "Save" to download
        </div>
    `;
    
    document.body.appendChild(instructions);
}

function printCV() {
    // Show print dialog
    window.print();
    
    // Show success message
    setTimeout(() => {
        showNotification('Print dialog opened! Choose "Save as PDF" to download your CV.');
    }, 500);
}

function showNotification(message) {
    // Create notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #2d5a3d;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { opacity: 0; transform: translate(-50%, -60%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add print-specific styles
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .print-button,
        div[style*="position: fixed"] {
            display: none !important;
        }
        
        body {
            margin: 0;
            padding: 0;
        }
        
        .cv-container {
            box-shadow: none;
            max-width: none;
            margin: 0;
        }
        
        .header {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
        }
        
        .section-title {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
        }
        
        .skill-tag, .tech-tag, .language-level {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
        }
        
        .skill-category {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
        }
        
        .project-item {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
        }
    }
`;
document.head.appendChild(printStyles);
