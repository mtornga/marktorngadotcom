const INK = '#1A1A1A';
const PINK = '#FF006E';
const CYAN = '#00F5FF';
const YELLOW = '#FFD60A';
const WHITE = '#FFFFFF';

// Landscape on purpose. On-screen text size is fontSize x (renderedWidth /
// viewBoxWidth), so the viewBox is kept as narrow as the content allows —
// a wider viewBox would shrink every label.
const VB_W = 1500;
const VB_H = 650;

const COL = [30, 410, 790, 1170]; // box left edges
const BOX_W = 300;
const BOX_H = 150;
const ROW_TOP = 70;
const ROW_MID = 250;
const ROW_BOTTOM = 430;

const cx = (col: number) => COL[col] + BOX_W / 2;
const cy = (rowY: number) => rowY + BOX_H / 2;

/** Neo-brutalist box: hard offset shadow behind a thick-stroked rect. */
function Box({
  col,
  y,
  fill = WHITE,
  title,
  sub,
  titleFill = INK,
  titleSize = 40,
  subSize = 26,
}: {
  col: number;
  y: number;
  fill?: string;
  title: string;
  sub?: string;
  titleFill?: string;
  /** Drop below the default only for labels too long to fit BOX_W at 40. */
  titleSize?: number;
  subSize?: number;
}) {
  const x = COL[col];
  const center = x + BOX_W / 2;
  return (
    <g>
      <rect x={x + 9} y={y + 9} width={BOX_W} height={BOX_H} fill={INK} />
      <rect
        x={x}
        y={y}
        width={BOX_W}
        height={BOX_H}
        fill={fill}
        stroke={INK}
        strokeWidth={5}
      />
      <text
        x={center}
        y={y + BOX_H / 2 - 2}
        textAnchor="middle"
        fontSize={titleSize}
        fontWeight={700}
        fill={titleFill}
      >
        {title}
      </text>
      {sub && (
        <text
          x={center}
          y={y + BOX_H / 2 + 40}
          textAnchor="middle"
          fontSize={subSize}
          fontWeight={400}
          fill={titleFill}
          opacity={0.8}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Flow({ d, explain = false }: { d: string; explain?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={explain ? INK : PINK}
      strokeWidth={7}
      strokeDasharray={explain ? '16 10' : undefined}
      markerEnd={explain ? 'url(#arrow-explain)' : 'url(#arrow-read)'}
    />
  );
}

export default function ArchitectureDiagram() {
  return (
    <div className="overflow-x-auto border-4 border-neo-text bg-neo-surface shadow-neo">
      <div className="min-w-[720px] p-4 md:p-6">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-labelledby="arch-title arch-desc"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          <title id="arch-title">Read This For Me architecture</title>
          <desc id="arch-desc">
            One photo from the phone camera forks into two paths. The Read path
            posts to the /ocr Cloud Function, which calls Google Cloud Vision
            TEXT_DETECTION and returns every word with no language model
            involved. The Explain path posts to the /explainPipeline Cloud
            Function, which calls Cloud Vision and then Gemini Flash Lite to
            produce a short, medium, or long summary. Both paths converge on
            Cloud Text-to-Speech, which returns audio to the phone.
          </desc>

          <defs>
            <marker
              id="arrow-read"
              viewBox="0 0 12 12"
              refX="9"
              refY="6"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 1 1 L 11 6 L 1 11 z" fill={PINK} />
            </marker>
            <marker
              id="arrow-explain"
              viewBox="0 0 12 12"
              refX="9"
              refY="6"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 1 1 L 11 6 L 1 11 z" fill={INK} />
            </marker>
          </defs>

          {/* Fork out of the single capture */}
          <Flow
            d={`M ${COL[0] + BOX_W} ${cy(ROW_MID)} L 370 ${cy(ROW_MID)} L 370 ${cy(
              ROW_TOP
            )} L ${COL[1]} ${cy(ROW_TOP)}`}
          />
          <Flow
            explain
            d={`M ${COL[0] + BOX_W} ${cy(ROW_MID)} L 370 ${cy(ROW_MID)} L 370 ${cy(
              ROW_BOTTOM
            )} L ${COL[1]} ${cy(ROW_BOTTOM)}`}
          />

          {/* Straight hops through each band */}
          <Flow d={`M ${COL[1] + BOX_W} ${cy(ROW_TOP)} L ${COL[2]} ${cy(ROW_TOP)}`} />
          <Flow
            explain
            d={`M ${COL[1] + BOX_W} ${cy(ROW_BOTTOM)} L ${COL[2]} ${cy(ROW_BOTTOM)}`}
          />

          {/* Merge back into TTS */}
          <Flow
            d={`M ${COL[2] + BOX_W} ${cy(ROW_TOP)} L 1130 ${cy(ROW_TOP)} L 1130 ${cy(
              ROW_MID
            )} L ${COL[3]} ${cy(ROW_MID)}`}
          />
          <Flow
            explain
            d={`M ${COL[2] + BOX_W} ${cy(ROW_BOTTOM)} L 1130 ${cy(
              ROW_BOTTOM
            )} L 1130 ${cy(ROW_MID)} L ${COL[3]} ${cy(ROW_MID)}`}
          />

          {/* Boxes */}
          <Box col={0} y={ROW_MID} title="ONE PHOTO" sub="expo-camera" />

          <Box
            col={1}
            y={ROW_TOP}
            fill={PINK}
            titleFill={WHITE}
            title="READ"
            sub="POST /ocr"
          />
          <Box
            col={2}
            y={ROW_TOP}
            fill={YELLOW}
            title="CLOUD VISION"
            sub="every word · no LLM"
          />

          <Box
            col={1}
            y={ROW_BOTTOM}
            fill={CYAN}
            title="EXPLAIN"
            sub="POST /explainPipeline"
          />
          <Box
            col={2}
            y={ROW_BOTTOM}
            fill={CYAN}
            title="VISION → GEMINI"
            titleSize={30}
            sub="short · medium · long"
          />

          <Box
            col={3}
            y={ROW_MID}
            fill={YELLOW}
            title="CLOUD TTS"
            sub="Neural2-J → audio"
          />

          {/* Legend */}
          <line x1={430} y1={622} x2={500} y2={622} stroke={PINK} strokeWidth={10} />
          <text x={514} y={633} fontSize={28} fontWeight={700} fill={INK}>
            READ EVERY WORD
          </text>
          <line
            x1={830}
            y1={622}
            x2={900}
            y2={622}
            stroke={INK}
            strokeWidth={10}
            strokeDasharray="16 10"
          />
          <text x={914} y={633} fontSize={28} fontWeight={700} fill={INK}>
            EXPLAIN IT TO ME
          </text>
        </svg>
      </div>
    </div>
  );
}
