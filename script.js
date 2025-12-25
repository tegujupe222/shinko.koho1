// Chart.jsの設定
const chartConfig = {
    type: 'bar',
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
};

// グラフの色パレット（複数の選択肢に対応）
const colorPalette = {
    backgroundColor: [
        'rgba(102, 126, 234, 0.8)',
        'rgba(118, 75, 162, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(201, 203, 207, 0.8)',
    ],
    borderColor: [
        'rgba(102, 126, 234, 1)',
        'rgba(118, 75, 162, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(201, 203, 207, 1)',
    ]
};

// グラフを作成する関数
function createChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const labels = Object.keys(data.responses);
    const values = Object.values(data.responses);
    
    const chartData = {
        labels: labels,
        datasets: [{
            label: '回答数',
            data: values,
            backgroundColor: labels.map((_, index) => 
                colorPalette.backgroundColor[index % colorPalette.backgroundColor.length]
            ),
            borderColor: labels.map((_, index) => 
                colorPalette.borderColor[index % colorPalette.borderColor.length]
            ),
            borderWidth: 2
        }]
    };
    
    new Chart(ctx, {
        ...chartConfig,
        data: chartData
    });
}

// 改善点リストを表示する関数
function displayImprovements(elementId, improvements) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.innerHTML = '';
    const filteredImprovements = improvements.filter(improvement => {
        const trimmed = improvement ? improvement.trim() : '';
        return trimmed !== '' && 
               trimmed !== '特になし' && 
               trimmed !== '特にありません。' && 
               trimmed !== 'なし' &&
               trimmed !== '特に' &&
               trimmed !== '　' &&
               trimmed !== '特にありません' &&
               trimmed !== '特にございません。' &&
               trimmed !== '特にございません';
    });
    
    if (filteredImprovements.length === 0) {
        const li = document.createElement('li');
        li.textContent = '特になし';
        li.style.fontStyle = 'italic';
        li.style.color = '#6c757d';
        element.appendChild(li);
        return;
    }
    
    filteredImprovements.forEach(improvement => {
        const li = document.createElement('li');
        li.textContent = improvement;
        element.appendChild(li);
    });
}

// ページ読み込み時にデータを表示
document.addEventListener('DOMContentLoaded', function() {
    // セッション1
    createChart('chart1', surveyData.session1.question1);
    displayImprovements('improvements1', surveyData.session1.question1.improvements);
    
    createChart('chart2', surveyData.session1.question2);
    displayImprovements('improvements2', surveyData.session1.question2.improvements);
    
    // セッション2
    createChart('chart3', surveyData.session2.question3);
    displayImprovements('improvements3', surveyData.session2.question3.improvements);
    
    createChart('chart4', surveyData.session2.question4);
    displayImprovements('improvements4', surveyData.session2.question4.improvements);
    
    // セッション3
    createChart('chart5', surveyData.session3.question5);
    displayImprovements('improvements5', surveyData.session3.question5.improvements);
    
    // セッション4
    displayImprovements('freeText', surveyData.session4.question6.improvements);
    
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


