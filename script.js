const TABS_CONFIG = {
    "SERVICIOS GENERALES": ["Principal", "Generador Diesel", "Transformadores", "Distribucion AC/DC"],
    "SEHUENCAS": ["Principal", "Alarmas", "Tendencias"],
    "JUNTAS": {
        "2000 SSGG": {
            "2020 Unifilar": {
                "0211 Grupo 1": {
                    "0211 CCM 21BMA10": null,
                    "0212 CCM 21BMA10": null,
                    "0218 Tableros": null
                },
                "0221 Grupo 2": {
                    "0221 CCM 22BMA10": null,
                    "0222 CCM 22BMA10": null,
                    "0228 Tableros": null
                },
                "0023 SSGG 20BMB10": null,
                "0024 SSGG 20BMB10": null,
                "0025 SSGG 20BMB10": null,
                "0026 SSGG Tableros": null,
                "0029 Totalizadores": null
            },
            "2020 Secuencias": null,
            "2030 Camara Val": null,
            "2040 PTA": {
                "2041 Agua Potable": null
            },
            "2050 Drenajes": null,
            "2060 Grupo Diesel": null,
            "2070 Toma": {
                "2071 Azud": null,
                "2072 Desarenador": null,
                "2073 Balsa": null
            },
            "2080 Estacion Meteo": null
        },
        "2100 Grupo 1": {
            "2115 Valvula Entrada": null,
            "2120 Secuencias": null,
            "2130 Turbina": {
                "2131 Estados": null,
                "2136 GOPs Turbina": null
            },
            "2140 Generador": {
                "2141 Estados 1": null,
                "2142 Estados 2": null,
                "2143 Estados 3": null,
                "2144 Estados 4": null,
                "2145 Estados 5": null,
                "2146 Estados 6": null,
                "2149 Hidrostatico": null
            },
            "2150 Extincion": null,
            "2160 Refrigeracion": null
        },
        "2200 Grupo 2": {
            "2210 Sala Electrica": null,
            "2215 Valvula Entrada": null,
            "2220 Secuencias": null,
            "2230 Turbina": null,
            "2240 Generador": null
        }
    },
    "EMBALSE": ["Principal", "Alarmas", "Tendencias"]
};

const STATE = {
    activePrimary: "SERVICIOS GENERALES",
    // Active path tracks the selection depth.
    activePath: ["Principal"],
    currentImageIndex: 0
};

function init() {
    startClock();
    try {
        renderPrimaryTabs();
        renderAllNavLevels();
        renderView();
    } catch (e) {
        console.error("Initialization error:", e);
    }
}

function renderPrimaryTabs() {
    const list = document.getElementById('primary-tabs');
    list.innerHTML = '';

    Object.keys(TABS_CONFIG).forEach(key => {
        const li = document.createElement('li');
        li.textContent = key;
        if (key === STATE.activePrimary) li.classList.add('active');

        li.onclick = () => {
            STATE.activePrimary = key;
            STATE.activePath = []; // No default selection, user must navigate
            STATE.currentImageIndex = 0; // Reset image index

            renderPrimaryTabs();
            renderAllNavLevels();
            renderView();
        };

        list.appendChild(li);
    });
}

function renderAllNavLevels() {
    const navContainer = document.querySelector('.secondary-nav');
    navContainer.innerHTML = '';
    navContainer.style.height = 'auto';
    navContainer.style.display = 'flex';
    navContainer.style.flexDirection = 'column';
    navContainer.style.background = 'transparent';

    let currentConfig = TABS_CONFIG[STATE.activePrimary];
    let currentDepth = 0;

    while (currentConfig) {
        let items = [];
        if (Array.isArray(currentConfig)) {
            items = currentConfig;
            currentConfig = null;
        } else if (typeof currentConfig === 'object' && currentConfig !== null) {
            items = Object.keys(currentConfig);
        } else {
            break;
        }

        const ul = document.createElement('ul');
        ul.className = 'nav-level';
        // Inline styles removed in favor of style.css class .nav-level

        const depth = currentDepth; // Capture depth value for closure
        const activeItemName = STATE.activePath[depth];

        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            // Inline styles removed in favor of style.css

            if (item === activeItemName) {
                li.classList.add('active-nav-item');
            }

            li.onclick = () => {
                const newPath = STATE.activePath.slice(0, depth);
                newPath.push(item);
                STATE.activePath = newPath;
                STATE.currentImageIndex = 0; // Reset image index

                renderAllNavLevels();
                renderView();
            };

            ul.appendChild(li);
        });

        navContainer.appendChild(ul);

        if (activeItemName && !Array.isArray(currentConfig) && currentConfig[activeItemName]) {
            currentConfig = currentConfig[activeItemName];
            currentDepth++;
        } else {
            currentConfig = null;
        }
    }
}

const IMAGE_MAP = {
    // SERVICIOS GENERALES
    "SERVICIOS GENERALES": ["0020vista general.jpg"],
    "SERVICIOS GENERALES|Principal": ["A2.jpg"],
    "SERVICIOS GENERALES|Generador Diesel": ["2060 grupodiesel.png"],

    // SEHUENCAS
    "SEHUENCAS": ["0020vista general.jpg"],

    // JUNTAS
    "JUNTAS": ["0020vista general.jpg"],

    // JUNTAS - 2000 SSGG
    "JUNTAS|2000 SSGG": ["0020vista general.jpg"],
    "JUNTAS|2000 SSGG|2020 Unifilar": ["0020unifilar.jpg"],
    "JUNTAS|2000 SSGG|2020 Secuencias": ["2020 Secuencias.png"],
    "JUNTAS|2000 SSGG|2030 Camara Val": ["2030camara val.jpg"],
    "JUNTAS|2000 SSGG|2040 PTA": ["2040 PTA.jpg"],
    "JUNTAS|2000 SSGG|2050 Drenajes": ["2050 Drenajes.jpg"],
    "JUNTAS|2000 SSGG|2060 Grupo Diesel": ["2060 grupodiesel.png"],
    "JUNTAS|2000 SSGG|2070 Toma": ["2070 Toma.png"],
    "JUNTAS|2000 SSGG|2080 Estacion Meteo": ["2080 Estacion Meteo.png"],

    // JUNTAS - 2100 Grupo 1
    "JUNTAS|2100 Grupo 1": ["2100 grupo 1 juntas.jpg"],
    "JUNTAS|2100 Grupo 1|2115 Valvula Entrada": ["2115 Valvula Entrada.jpg"],
    "JUNTAS|2100 Grupo 1|2120 Secuencias": ["2120 Secuencias.jpg"],
    "JUNTAS|2100 Grupo 1|2130 Turbina": ["2130 turbina.jpg"],
    "JUNTAS|2100 Grupo 1|2130 Turbina|2131 Estados": ["2130 Estados.jpg"],
    "JUNTAS|2100 Grupo 1|2130 Turbina|2136 GOPs Turbina": ["2135 GOP a Turbina.jpg"],
    "JUNTAS|2100 Grupo 1|2140 Generador": ["2140 Generador.jpg"],
    "JUNTAS|2100 Grupo 1|2140 Generador|2141 Estados 1": ["2141 Estados 1.jpg"],
    "JUNTAS|2100 Grupo 1|2140 Generador|2142 Estados 2": ["2142 Estados 2.jpg"],
    "JUNTAS|2100 Grupo 1|2140 Generador|2143 Estados 3": ["2143 Estados 3.jpg"],
    "JUNTAS|2100 Grupo 1|2140 Generador|2144 Estados 4": ["2144 Estados 4.jpg"],
    "JUNTAS|2100 Grupo 1|2140 Generador|2145 Estados 5": ["2145 Estados 5.jpg"],
    "JUNTAS|2100 Grupo 1|2140 Generador|2146 Estados 6": ["2144 Estados 6.jpg"],
    "JUNTAS|2100 Grupo 1|2140 Generador|2149 Hidrostatico": ["2149 Hidrostatico.jpg"],
    "JUNTAS|2100 Grupo 1|2150 Extincion": ["2150 Extincion.jpg"],
    "JUNTAS|2100 Grupo 1|2160 Refrigeracion": ["2160 Refrigeracion.jpg"],

    // JUNTAS - 2200 Grupo 2
    "JUNTAS|2200 Grupo 2": ["2200 GRUPO 2.jpg"],
    "JUNTAS|2200 Grupo 2|2210 Sala Electrica": ["2210 Sala Electrica.jpg"],
    "JUNTAS|2200 Grupo 2|2215 Valvula Entrada": ["2215 Valvula Entrada.jpg"],
    "JUNTAS|2200 Grupo 2|2220 Secuencias": ["2220 Secuencias.jpg"],
    "JUNTAS|2200 Grupo 2|2230 Turbina": ["2230 Turbina.jpg"],
    "JUNTAS|2200 Grupo 2|2240 Generador": ["2240 Generador.jpg"],

    // EMBALSE
    "EMBALSE": ["0020vista general.jpg"],

    // Default / Example for others
    "EMBALSE|Principal": ["A2.jpg"]
};

function getImagesForCurrentView() {
    const key = [STATE.activePrimary, ...STATE.activePath].join('|');
    return IMAGE_MAP[key] || null;
}

function renderView() {
    const container = document.getElementById('view-container');
    container.innerHTML = '';

    const p = STATE.activePath;

    // Special case for JUNTAS - Hidrostatico (Custom Schematic)
    if (STATE.activePrimary === "JUNTAS" &&
        p.length === 3 &&
        p[0] === "2100 Grupo 1" &&
        p[1] === "2140 Generador" &&
        p[2] === "2149 Hidrostatico") {
        renderSchematic(container);
        return;
    }

    // Dynamic Image Lookup
    const images = getImagesForCurrentView();
    if (images) {
        renderImage(container, images);
        return;
    }

    renderPlaceholder(container);
}

function renderImage(container, imageNames) {
    if (!Array.isArray(imageNames)) imageNames = [imageNames];

    const currentImg = imageNames[STATE.currentImageIndex] || imageNames[0];
    const imgPath = `assets/${currentImg}`;

    container.innerHTML = `
        <div class="image-viewer-container">
            <div class="image-display">
                <img src="${imgPath}" alt="${currentImg}">
            </div>
            ${imageNames.length > 1 ? `
                <div class="image-nav-floating">
                    <button class="nav-arrow" onclick="changeImage(-1)">&#10094;</button>
                    <span class="image-counter">${STATE.currentImageIndex + 1} / ${imageNames.length}</span>
                    <button class="nav-arrow" onclick="changeImage(1)">&#10095;</button>
                </div>
            ` : ''}
        </div>
    `;
}

window.changeImage = function (direction) {
    const images = getImagesForCurrentView();
    if (images && images.length > 0) {
        STATE.currentImageIndex = (STATE.currentImageIndex + direction + images.length) % images.length;
        renderView();
    }
};

function renderPlaceholder(container) {
    const pathString = STATE.activePrimary + " > " + STATE.activePath.join(" > ");
    const div = document.createElement('div');
    div.className = 'placeholder-view';
    div.innerHTML = `
        <div style="text-align: center;">
            <h2 style="color: #fff;">${STATE.activePrimary}</h2>
            <h3 style="color: #00aaff; margin-top: 10px;">${STATE.activePath.join(" / ")}</h3>
            <p style="margin-top: 20px;">Vista no implementada.</p>
        </div>
    `;
    container.appendChild(div);
}

function renderSchematic(container) {
    container.innerHTML = `
        <div class="schematic-container" style="position: relative; width: 100%; height: 100%; border: 2px solid #555;">
            
            <!-- SVG Layer for Lines and Connections -->
            <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#00ccff" />
                    </marker>
                    <!-- Pump Symbol Definition -->
                    <symbol id="pump-symbol" viewBox="0 0 40 40">
                         <circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/>
                         <path d="M10,28 L30,28 L20,10 Z" fill="white"/>
                    </symbol>
                    <!-- Filter Symbol -->
                    <symbol id="filter-symbol" viewBox="0 0 40 40">
                        <path d="M5,20 L20,5 L35,20 L20,35 Z" fill="none" stroke="white" stroke-width="2"/>
                        <line x1="5" y1="20" x2="35" y2="20" stroke="white" stroke-width="1" stroke-dasharray="2,2"/>
                    </symbol>
                </defs>

                <!-- Upper Connections (L.A - Generator - L.O.A) -->
                <line x1="25%" y1="35%" x2="25%" y2="20%" stroke="#00ccff" stroke-width="2" />
                <line x1="25%" y1="20%" x2="50%" y2="20%" stroke="#00ccff" stroke-width="2" />
                <line x1="50%" y1="20%" x2="50%" y2="30%" stroke="#00ccff" stroke-width="2" /> <!-- Into Generator -->
                
                <line x1="60%" y1="30%" x2="70%" y2="30%" stroke="#00ccff" stroke-width="2" /> <!-- Generator to LOA -->
                <line x1="75%" y1="30%" x2="75%" y2="50%" stroke="#00ccff" stroke-width="2" />

                <!-- Lower Connections (Pumps to System) -->
                <line x1="20%" y1="75%" x2="20%" y2="55%" stroke="#888" stroke-width="2" stroke-dasharray="4,4" /> <!-- Pump 1 to system -->
                <line x1="30%" y1="75%" x2="30%" y2="55%" stroke="#888" stroke-width="2" stroke-dasharray="4,4" /> <!-- Pump 2 to system -->
                
                <line x1="20%" y1="55%" x2="30%" y2="55%" stroke="#888" stroke-width="2" />
                <line x1="25%" y1="55%" x2="25%" y2="40%" stroke="#888" stroke-width="2" />

            </svg>

            <!-- Grid Lines (Cross) -->
            <div style="position: absolute; top: 0; bottom: 0; left: 50%; border-left: 2px solid #000;"></div>
            <div style="position: absolute; left: 0; right: 0; top: 50%; border-top: 2px solid #000;"></div>

            <!-- COMPONENT BOXES -->
            
            <!-- L.A. -->
            <div class="schematic-box" style="top: 25%; left: 40%; width: 6%; height: 10%;">
                L.A.
            </div>

            <!-- GENERADOR -->
            <div class="schematic-box" style="top: 22%; left: 47%; width: 15%; height: 16%; border-color: #fff; background-color: rgba(255,255,255,0.05);">
                GENERADOR
            </div>
            
            <!-- L.O.A. -->
             <div class="schematic-box" style="top: 25%; left: 63%; width: 6%; height: 10%;">
                L.O.A.
            </div>

            <!-- LABELS & INDICATORS -->
            
            <!-- Flujo L.O.A -->
            <div style="position: absolute; top: 38%; left: 16%; color: #fff; font-size: 0.7rem;">FLUJO L.O.A</div>
            <div style="position: absolute; top: 38%; left: 20%; width: 12px; height: 12px; border-radius: 50%; background: #00ccff; border: 1px solid #fff;"></div>

            <div style="position: absolute; top: 38%; left: 26%; color: #fff; font-size: 0.7rem;">FLUJO L.A</div>
            <div style="position: absolute; top: 38%; left: 30%; width: 12px; height: 12px; border-radius: 50%; background: #00ccff; border: 1px solid #fff;"></div>

            <!-- Filters -->
            <div style="position: absolute; top: 48%; left: 18%;">
                <svg width="30" height="30"><use href="#filter-symbol"/></svg>
                <div style="font-size: 0.6rem; color: #aaa; text-align: center;">FILTRO 1<br>OBSTRUIDO</div>
                <div style="position: absolute; top: 0; right: -10px; width: 10px; height: 10px; border-radius: 50%; border: 1px solid #aaa;"></div>
            </div>
            
             <div style="position: absolute; top: 48%; left: 28%;">
                <svg width="30" height="30"><use href="#filter-symbol"/></svg>
                <div style="font-size: 0.6rem; color: #aaa; text-align: center;">FILTRO 2<br>OBSTRUIDO</div>
                <div style="position: absolute; top: 0; right: -10px; width: 10px; height: 10px; border-radius: 50%; border: 1px solid #aaa;"></div>
            </div>


            <!-- PUMPS (BOMBAS) -->
            <!-- AP001 -->
            <div style="position: absolute; top: 75%; left: 18%; text-align: center;">
                 <div style="background: #333; color: white; padding: 2px 5px; font-size: 0.6rem; display: inline-block;">REMOTO</div>
                 <div style="width: 50px; height: 50px; margin: 2px auto;">
                    <svg width="100%" height="100%" viewBox="0 0 40 40">
                         <circle cx="20" cy="20" r="18" fill="#111" stroke="white" stroke-width="2"/>
                         <path d="M10,28 L30,28 L20,10 Z" fill="#000"/> <!-- Off state black? or white? Image shows black with white outline -->
                    </svg>
                 </div>
                 <div style="font-size: 0.7rem; color: white; font-weight: bold;">AP001</div>
            </div>

             <!-- AP002 -->
            <div style="position: absolute; top: 75%; left: 28%; text-align: center;">
                 <div style="background: #333; color: white; padding: 2px 5px; font-size: 0.6rem; display: inline-block;">REMOTO</div>
                 <div style="width: 50px; height: 50px; margin: 2px auto;">
                    <svg width="100%" height="100%" viewBox="0 0 40 40">
                         <circle cx="20" cy="20" r="18" fill="#111" stroke="white" stroke-width="2"/>
                         <path d="M10,28 L30,28 L20,10 Z" fill="white"/> <!-- On state white? User active logic later -->
                    </svg>
                 </div>
                 <div style="font-size: 0.7rem; color: white; font-weight: bold;">AP002</div>
            </div>

            <!-- Priority Control -->
            <div style="position: absolute; top: 85%; left: 15%; border: 1px solid #fff; padding: 5px; display: flex; gap: 5px;">
                <div style="text-align: center;">
                    <div style="font-size: 0.6rem; color:white;">PRIORIDAD<br>BOMBAS</div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    <div style="border: 1px solid #fff; padding: 2px; font-size: 0.6rem; background: #ddd; color: black; text-align: center;">1->2</div>
                    <div style="width: 10px; height: 10px; background: #00ccff; border-radius: 50%; margin: 0 auto;"></div>
                </div>
                 <div style="display: flex; flex-direction: column; gap: 2px;">
                    <div style="border: 1px solid #fff; padding: 2px; font-size: 0.6rem; text-align: center;">2->1</div>
                    <div style="width: 10px; height: 10px; border: 1px solid #fff; border-radius: 50%; margin: 0 auto;"></div>
                </div>
            </div>

            <!-- Temperature Reading -->
             <div style="position: absolute; top: 82%; left: 5%; border: 1px solid #fff; padding: 5px; width: 80px; text-align: center;">
                <div style="font-size: 0.6rem; color: white;">TEMPERATURA</div>
                <div style="font-size: 1rem; color: white; font-weight: bold;">20.4 °C</div>
            </div>
            
            <!-- Left Side Sensors -->
            <div style="position: absolute; top: 40%; left: 10%; text-align: right;">
                <div style="font-size: 0.7rem; color: #fff;">PRESION 50<br>BAR</div>
                <div style="width: 12px; height: 12px; border-radius: 50%; background: #00ccff; border: 1px solid #fff; display: inline-block;"></div>
            </div>

            <!-- Temperature Alarms under L.A. -->
             <div style="position: absolute; top: 42%; left: 51%;">
                <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                    <div style="width: 10px; height: 10px; border-radius: 50%; border: 1px solid #fff;"></div>
                    <div style="font-size: 0.6rem; color: #fff;">TEMPERATURA ALTA</div>
                </div>
                 <div style="display: flex; align-items: center; gap: 5px;">
                    <div style="width: 10px; height: 10px; border-radius: 50%; border: 1px solid #fff;"></div>
                    <div style="font-size: 0.6rem; color: #fff;">TEMPERATURA MUY ALTA</div>
                </div>
            </div>

            <!-- Temp Reading Box -->
            <div style="position: absolute; top: 41%; left: 47%; border: 1px solid #fff; padding: 2px; width: 50px; text-align: center;">
                 <div style="font-size: 0.5rem; color: #fff;">TEMPERATURA</div>
                 <div style="font-size: 0.8rem; color: #fff;">22.0 °C</div>
            </div>

            <!-- Right Side Filters / Respaldo -->
            <div style="position: absolute; top: 40%; right: 5%; border: 1px solid #00ccff; padding: 10px; width: 100px; height: 120px;">
                <div style="font-size: 0.7rem; color: #fff; text-align: right;">TEMPERATURA</div>
                <div style="position: absolute; top: 30%; left: 10%;">
                    <svg width="40" height="40"><use href="#filter-symbol"/></svg>
                </div>
                <div style="position: absolute; bottom: 5px; left: 5px; font-size: 0.7rem; color: #fff;">RESPALDO</div>
            </div>

             <!-- Main Filters Top Right -->
             <div style="position: absolute; top: 60%; right: 25%;">
                <svg width="30" height="30"><use href="#filter-symbol"/></svg>
                <div style="font-size: 0.6rem; color: #aaa; text-align: center;">FILTRO 1<br>OBSTRUIDO</div>
                 <div style="position: absolute; top: 0; left: -15px; width: 10px; height: 10px; border-radius: 50%; border: 1px solid #aaa;"></div>
            </div>
             <div style="position: absolute; top: 60%; right: 15%;">
                <svg width="30" height="30"><use href="#filter-symbol"/></svg>
                 <div style="font-size: 0.6rem; color: #aaa; text-align: center;">FILTRO 2<br>OBSTRUIDO</div>
                 <div style="position: absolute; top: 0; left: -15px; width: 10px; height: 10px; border-radius: 50%; border: 1px solid #aaa;"></div>
            </div>

            <!-- Heat Exchanger / Cooler Symbol in Right Quadrant -->
             <div style="position: absolute; top: 70%; right: 10%; border: 1px solid #00ccff; width: 40px; height: 60px;">
                <!-- Internal zig zag lines for cooler -->
                <svg width="100%" height="100%">
                    <polyline points="0,10 40,10 0,20 40,20 0,30 40,30 0,40 40,40" fill="none" stroke="#00ccff" stroke-width="1"/>
                </svg>
            </div>
             <div style="position: absolute; top: 85%; right: 5%; font-size: 0.7rem; color: white;">NIVEL BAJO</div>
             <div style="position: absolute; top: 85%; right: 2%; width: 12px; height: 12px; border-radius: 50%; border: 1px solid #fff;"></div>

        </div>
    `;
}

function startClock() {
    const update = () => {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleTimeString('es-ES');
        document.getElementById('date').textContent = now.toLocaleDateString('es-ES');
    };
    update();
    setInterval(update, 1000);
}

// Start
init();
