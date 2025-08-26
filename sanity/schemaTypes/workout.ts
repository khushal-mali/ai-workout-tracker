import {defineType, defineField} from 'sanity'

export default defineType({
  type: 'document',
  name: 'workout',
  title: 'Workout',
  description: 'A workout session containing multiple exercises with sets, reps, and weights',
  fields: [
    defineField({
      type: 'string',
      name: 'userId',
      title: 'User ID',
      description: 'The Clerk user ID of the person who performed this workout',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'datetime',
      name: 'date',
      title: 'Workout Date & Time',
      description: 'When this workout was performed',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
    }),
    defineField({
      type: 'number',
      name: 'duration',
      title: 'Duration (seconds)',
      description: 'Total duration of the workout in seconds',
      validation: (Rule) => Rule.required().min(1).max(86400), // Max 24 hours
    }),
    defineField({
      type: 'array',
      name: 'exercises',
      title: 'Exercises',
      description: 'List of exercises performed in this workout with their details',
      of: [
        defineField({
          type: 'object',
          name: 'workoutExercise',
          title: 'Workout Exercise',
          fields: [
            defineField({
              type: 'reference',
              name: 'exercise',
              title: 'Exercise',
              description: 'The exercise being performed',
              to: [{type: 'exercise'}],
              validation: (Rule) => Rule.required(),
            }),
            // defineField({
            //   type: 'number',
            //   name: 'sets',
            //   title: 'Number of Sets',
            //   description: 'How many sets of this exercise were performed',
            //   validation: (Rule) => Rule.required().min(1).max(50),
            //   initialValue: 1,
            // }),
            defineField({
              type: 'array',
              name: 'setDetails',
              title: 'Set Details',
              description: 'Detailed information for each set (reps, weight, etc.)',
              of: [
                defineField({
                  type: 'object',
                  name: 'set',
                  title: 'Set',
                  fields: [
                    defineField({
                      type: 'number',
                      name: 'reps',
                      title: 'Repetitions',
                      description: 'Number of repetitions performed in this set',
                      validation: (Rule) => Rule.required().min(1).max(1000),
                    }),
                    defineField({
                      type: 'number',
                      name: 'weight',
                      title: 'Weight',
                      description: 'Weight used for this set (optional for bodyweight exercises)',
                      validation: (Rule) => Rule.min(0).max(1000),
                    }),
                    defineField({
                      type: 'string',
                      name: 'weightUnit',
                      title: 'Weight Unit',
                      description: 'Unit of measurement for the weight',
                      options: {
                        list: [
                          {title: 'Pounds (lbs)', value: 'lbs'},
                          {title: 'Kilograms (kg)', value: 'kg'},
                        ],
                        layout: 'radio',
                      },
                      hidden: ({parent}) => !parent?.weight,
                    }),
                    // defineField({
                    //   type: 'number',
                    //   name: 'restTime',
                    //   title: 'Rest Time (seconds)',
                    //   description: 'Rest time after this set in seconds',
                    //   validation: (Rule) => Rule.min(0).max(600), // Max 10 minutes
                    // }),
                    // defineField({
                    //   type: 'text',
                    //   name: 'notes',
                    //   title: 'Notes',
                    //   description: 'Additional notes about this set (optional)',
                    //   rows: 2,
                    // }),
                  ],
                  preview: {
                    select: {
                      reps: 'reps',
                      weight: 'weight',
                      weightUnit: 'weightUnit',
                    },
                    prepare(selection) {
                      const {reps, weight, weightUnit} = selection
                      const weightText =
                        weight && weightUnit ? `${weight}${weightUnit}` : 'Bodyweight'
                      return {
                        title: `${reps} reps @ ${weightText}`,
                      }
                    },
                  },
                }),
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
            // defineField({
            //   type: 'text',
            //   name: 'notes',
            //   title: 'Exercise Notes',
            //   description: 'Additional notes about this exercise in the workout',
            //   rows: 2,
            // }),
          ],
          preview: {
            select: {
              exerciseName: 'exercise.name',
              setDetails: 'setDetails',
              media: 'exercise.image',
            },
            prepare(selection) {
              const {exerciseName, setDetails, media} = selection
              const sets = Array.isArray(setDetails) ? setDetails.length : 0
              return {
                title: exerciseName || 'Exercise',
                subtitle: `${sets || 0} sets`,
                media: media,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    // defineField({
    //   type: 'text',
    //   name: 'notes',
    //   title: 'Workout Notes',
    //   description: 'Overall notes about this workout session',
    //   rows: 3,
    // }),
    // defineField({
    //   type: 'string',
    //   name: 'workoutType',
    //   title: 'Workout Type',
    //   description: 'Type or category of this workout',
    //   options: {
    //     list: [
    //       {title: 'Strength Training', value: 'strength'},
    //       {title: 'Cardio', value: 'cardio'},
    //       {title: 'Flexibility', value: 'flexibility'},
    //       {title: 'Mixed', value: 'mixed'},
    //       {title: 'Other', value: 'other'},
    //     ],
    //     layout: 'dropdown',
    //   },
    // }),
  ],
  preview: {
    select: {
      date: 'date',
      duration: 'duration',
      exerciseCount: 'exercises',
    },
    prepare(selection) {
      const {date, duration, exerciseCount} = selection
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'No date'
      const formattedDuration = duration
        ? `${Math.floor(duration / 60)}m ${duration % 60}s`
        : 'No duration'
      const exerciseCountText = exerciseCount ? `${exerciseCount.length} exercises` : 'No exercises'

      return {
        title: `Workout - ${formattedDate}`,
        subtitle: `${formattedDuration} | ${exerciseCountText}`,
      }
    },
  },
  orderings: [
    {
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Date (Oldest First)',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
    {
      title: 'Duration (Longest First)',
      name: 'durationDesc',
      by: [{field: 'duration', direction: 'desc'}],
    },
    {
      title: 'Duration (Shortest First)',
      name: 'durationAsc',
      by: [{field: 'duration', direction: 'asc'}],
    },
  ],
})
