import { motion } from 'framer-motion'
// TODO: Replace staff lookup with real API

const ProgramStaffSection = ({ program }) => {
  if (!program.staffHighlights || program.staffHighlights.length === 0) {
    return null
  }

  // TODO: Render staff highlights using real staff data from API
  return null
}

export default ProgramStaffSection
