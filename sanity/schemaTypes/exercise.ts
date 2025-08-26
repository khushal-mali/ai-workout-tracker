import {defineType, defineField} from 'sanity'

export default defineType({
  type: 'document',
  name: 'exercise',
  title: 'Exercise',
  // icon: '🏋️‍♂️',
  description: 'A physical exercise that can be performed during workouts',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Exercise Name',
      description: 'The name of the exercise (e.g., "Push-ups", "Squats", "Deadlift")',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      type: 'text',
      name: 'description',
      title: 'Description',
      description:
        'Detailed description of how to perform the exercise, including proper form and technique',
      validation: (Rule) => Rule.required().min(10).max(1000),
      rows: 4,
    }),
    defineField({
      type: 'string',
      name: 'difficulty',
      title: 'Difficulty Level',
      description: 'The skill level required to perform this exercise safely and effectively',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'image',
      name: 'image',
      title: 'Exercise Image',
      description:
        'A clear image showing the exercise being performed or demonstrating proper form',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          type: 'string',
          name: 'alt',
          title: 'Alt Text',
          description:
            'Alternative text for accessibility and SEO - describe what is happening in the image',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'url',
      name: 'videoUrl',
      title: 'Video URL',
      description: 'Link to a video demonstrating the exercise (YouTube, Vimeo, etc.)',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      type: 'boolean',
      name: 'isActive',
      title: 'Active Status',
      description: 'Whether this exercise is currently available for use in workouts',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      difficulty: 'difficulty',
      media: 'image',
    },
    prepare(selection) {
      const {title, difficulty, media} = selection
      return {
        title: title,
        subtitle: `Difficulty: ${difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Not set'}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Name Z-A',
      name: 'nameDesc',
      by: [{field: 'name', direction: 'desc'}],
    },
    {
      title: 'Difficulty (Beginner to Advanced)',
      name: 'difficultyAsc',
      by: [{field: 'difficulty', direction: 'asc'}],
    },
    {
      title: 'Difficulty (Advanced to Beginner)',
      name: 'difficultyDesc',
      by: [{field: 'difficulty', direction: 'desc'}],
    },
  ],
})
